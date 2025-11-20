import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { normalizeRawgGame } from './lib/rawgMapper';
import { LoadRawgQueryDto } from './rest/dtos/load-rawg/query.dto';
import { LoadRawgBodyDto } from './rest/dtos/load-rawg/body.dto';
import { RAWG_GAMES_API_LINK } from './const/rawgGamesApiLink';
import { RawgGame } from './types/rawgGame';
import { RAWG_MAX_PAGE_SIZE } from './const/rawgMaxPageSize';
import { Prisma } from '@prisma/client';

interface LoadRawgParams {
  body: LoadRawgBodyDto;
  query: LoadRawgQueryDto;
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
    return this.prisma.game.findMany(query);
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
            update: game,
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
      update: normalizeRawgGame(game),
    });

    return normalizeRawgGame(game);
  }
}
