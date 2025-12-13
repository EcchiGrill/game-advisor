import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { normalizeRawgGame } from '../../lib/rawgMapper';
import { RAWG_GAMES_API_LINK } from './const/rawgGamesApiLink';
import { RawgGame } from './types/rawgGame';
import { RAWG_MAX_PAGE_SIZE } from './const/rawgMaxPageSize';
import { Game, Prisma } from '@prisma/client';
import { AdviceBodyDto, AIValue } from './rest/dtos/advice.body.dto';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { selectedGameFields } from './const/selectedGameFields';

interface LoadRawgParams {
  body: { limit?: number };
  query: { ordering?: string };
}

interface RawgGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgGame[];
}

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async getGames(query: Prisma.GameFindManyArgs) {
    const games = await this.prisma.game.findMany({
      ...query,
      select: selectedGameFields,
    });

    return games;
  }

  async getGame(slug: string) {
    const game = await this.prisma.game.findUnique({
      where: { slug },
      select: selectedGameFields,
    });

    if (!game) {
      throw new NotFoundException(`Game with slug "${slug}" not found`);
    }

    return game;
  }

  async createGame(body: Prisma.GameCreateInput) {
    const game = await this.prisma.game.create({
      data: body,
      select: selectedGameFields,
    });

    return game;
  }

  async updateGame(id: string, body: Prisma.GameUpdateInput) {
    const game = await this.prisma.game.update({
      where: { id },
      data: body,
      select: selectedGameFields,
    });

    return game;
  }

  async removeGame(id: string) {
    const game = await this.prisma.game.delete({
      where: { id },
      select: selectedGameFields,
    });

    return game;
  }

  async loadRawgGames({ body, query }: LoadRawgParams) {
    const { limit } = body;
    const { ordering } = query;

    const orderingQuery = ordering ? `&ordering=${ordering}` : '';

    const initialGamesCount = await this.prisma.game.count();

    let imported = 0;
    let pages = 0;

    let nextUrl: string | null =
      `${RAWG_GAMES_API_LINK}&page_size=${RAWG_MAX_PAGE_SIZE}${orderingQuery}`;

    while (nextUrl && imported < limit) {
      const response = (await fetch(nextUrl).then((r) =>
        r.json()
      )) as RawgGamesResponse;

      const games = response.results.map(normalizeRawgGame);

      if (!games.length) break;

      if (imported + games.length > limit) {
        games.splice(0, games.length - (limit - imported));
      }

      await this.prisma.$transaction(
        games.map((game) =>
          this.prisma.game.upsert({
            where: { slug: game.slug },
            create: game,
            update: {
              ...game,
              embedding: undefined,
              description: undefined,
            },
          })
        )
      );

      imported += games.length;
      nextUrl = response.next;
      pages++;
    }

    const currentGamesCount = await this.prisma.game.count();

    const totalLoaded = currentGamesCount - initialGamesCount;

    return {
      message: `Finished import. Total loaded: ${totalLoaded}. Total found: ${imported}. Total pages: ${pages}`,
      totalLoaded,
      totalFound: imported,
      totalPages: pages,
    };
  }

  async loadRawgGame(search: string) {
    const response = (await fetch(
      `${RAWG_GAMES_API_LINK}&search=${search}`
    ).then((r) => r.json())) as RawgGamesResponse;

    const game = response.results[0];

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    await this.prisma.game.upsert({
      where: { slug: game.slug },
      create: normalizeRawgGame(game),
      update: {
        ...normalizeRawgGame(game),
        embedding: undefined,
        description: undefined,
      },
    });

    return normalizeRawgGame(game);
  }

  async adviceGame(body: AdviceBodyDto) {
    const { ai, prompt } = body;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    let embeddedPrompt: number[];

    // 0) Check user prompt for validity
    if (ai === AIValue.gemini) {
      const isGameAdvice =
        (await gemini.models
          .generateContent({
            model: 'gemini-2.5-flash',
            contents: `              
            Check if the user is asking for a video game recommendation.
            Return Boolean. true if yes, false if no. 
            User: ${prompt}`,
            config: {
              systemInstruction:
                'You are a professional game recommendation engine.',
            },
          })
          .then((response) => response.text)) === 'false';

      if (!isGameAdvice) {
        throw new BadRequestException('Invalid prompt');
      }
    } else {
      const isGameAdvice = await openai.chat.completions
        .create({
          model: 'gpt-4.1-mini',
          response_format: { type: 'text' },
          messages: [
            {
              role: 'system',
              content: 'You are a professional game recommendation engine.',
            },
            {
              role: 'user',
              content: `
              Check if the user is asking for a video game recommendation.
              Return Boolean. true if yes, false if no. 
              User: ${prompt}`,
            },
          ],
        })
        .then((response) => response.choices[0].message.content === 'true');

      if (!isGameAdvice) {
        throw new BadRequestException('Invalid prompt');
      }
    }

    // 1) Get embedding for user prompt
    if (ai === AIValue.gemini) {
      const embedding = await gemini.models
        .embedContent({
          model: 'gemini-embedding-001',
          contents: prompt,
        })
        .then((response) => response.embeddings[0].values);

      embeddedPrompt = embedding;
    } else {
      const embedding = await openai.embeddings
        .create({
          model: 'text-embedding-3-small',
          input: prompt,
        })
        .then((response) => response.data[0].embedding);

      embeddedPrompt = embedding;
    }

    // 2) Semantic vector search
    const candidates: Game[] = await this.prisma.$queryRawUnsafe(`
      SELECT *,
             semantic_similarity(embedding, ARRAY[${embeddedPrompt}]::float8[]) AS similarity
      FROM "Game"
      ORDER BY similarity DESC
      LIMIT 15;
    `);

    // 3) Convert candidates to readable list
    const candidatesList = candidates
      .map((game, index) => `${index + 1}. ${game.name} — slug: ${game.slug}`)
      .join('\n');

    let result: string;

    // 4) AI rerank
    if (ai === AIValue.gemini) {
      result = await gemini.models
        .generateContent({
          model: 'gemini-2.5-flash',
          contents: `
        User prompt: 
        ${prompt}
        Top-15 semantically relevant games: 
        ${candidatesList}
        Pick the BEST MATCHING game. Prioritize games with high ratings. Use only open source data.
        Return only the slug of the best matching game. Do not include any other text.`,
          config: {
            systemInstruction:
              'You are a professional game recommendation engine.',
          },
        })
        .then((response) => response.text);
    } else {
      result = await openai.chat.completions
        .create({
          model: 'gpt-4.1-mini',
          response_format: { type: 'text' },
          messages: [
            {
              role: 'system',
              content: 'You are a professional game recommendation engine.',
            },
            {
              role: 'user',
              content: `
          User prompt: 
          ${prompt}
          Top-15 semantically relevant games:  
          ${candidatesList}
          Pick the BEST MATCHING game. Prioritize games with high ratings. Use only open source data.
          Return only the slug of the best matching game. Do not include any other text.
          `,
            },
          ],
        })
        .then((response) => response.choices[0].message.content);
    }

    // 5) Fetch final game details
    const game = candidates.find((game) => game.slug === result);

    if (!game) {
      throw new NotFoundException('No game found!');
    }

    return {
      id: game.id,
      name: game.name,
      slug: game.slug,
      description: game.description,
      playtime: game.playtime,
      rating: game.rating,
      metacritic: game.metacritic,
      coverUrl: game.coverUrl,
      genres: game.genres,
      platforms: game.platforms,
      releasedAt: game.releasedAt,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
    };
  }
}
