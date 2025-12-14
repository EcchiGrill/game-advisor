import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { findGame } from '../lib/utils/game/findGame';
import { generateGameDescription } from '../lib/utils/game/generateGameDescription';
import { generateGameEmbedding } from '../lib/utils/game/generateGameEmbedding';
import { extractNamesFromRelation } from 'src/lib/utils/extractNamesFromRelation';

function configurePrismaClient() {
  return new PrismaClient().$extends({
    query: {
      game: {
        async create({ args, query }) {
          const game = args.data as Prisma.GameCreateInput;

          const { name, genres, description, platforms } = game;

          const normalizedGenres = extractNamesFromRelation(genres);
          const normalizedPlatforms = extractNamesFromRelation(platforms);

          if (!description || description === '') {
            try {
              const generatedDescription = await generateGameDescription(
                name,
                normalizedGenres
              );

              game.description = generatedDescription;
            } catch (error) {
              console.error('Description generation failed:', error);
            }
          }

          try {
            const embedding = await generateGameEmbedding({
              name,
              genres: normalizedGenres,
              description,
              platforms: normalizedPlatforms,
            });
            game.embedding = embedding.data[0].embedding;
          } catch (error) {
            console.error('Embedding generation failed:', error);
          }

          return query(args);
        },

        async upsert({ args, query }) {
          const game = args.create as Prisma.GameCreateInput;

          const { name, genres, description, platforms } = game;

          const normalizedGenres = extractNamesFromRelation(genres);
          const normalizedPlatforms = extractNamesFromRelation(platforms);

          const existingGame = await findGame(args);

          if (!existingGame) {
            if (!description || description === '') {
              try {
                const generatedDescription = await generateGameDescription(
                  name,
                  normalizedGenres
                );

                game.description = generatedDescription;
              } catch (error) {
                console.error('Description generation failed (upsert):', error);
              }
            }

            try {
              const embedding = await generateGameEmbedding({
                name,
                genres: normalizedGenres,
                description,
                platforms: normalizedPlatforms,
              });

              game.embedding = embedding.data[0].embedding;
            } catch (error) {
              console.error('Embedding generation failed (upsert):', error);
            }
          }

          return query(args);
        },

        async update({ args, query }) {
          const game = args.data as Prisma.GameUpdateInput;

          const existingGame = await findGame(args);

          const { name, genres, description, platforms } = game;

          const normalizedGenres = extractNamesFromRelation(genres);

          const affectedFields = ['name', 'description', 'genres', 'platforms'];

          const shouldBeEmbedded = affectedFields.some(
            (field) => field in game
          );

          if (name && name !== existingGame?.name) {
            try {
              const generatedDescription = await generateGameDescription(
                name as string,
                normalizedGenres
              );

              game.description = generatedDescription;
            } catch (error) {
              console.error('Description generation failed (update):', error);
            }
          }

          if (shouldBeEmbedded && existingGame) {
            const newName = (name ?? existingGame.name) as string;

            const newGenreNames = genres
              ? extractNamesFromRelation(genres)
              : existingGame.genres.map((g) => g.name);

            const newPlatformNames = platforms
              ? extractNamesFromRelation(platforms)
              : existingGame.platforms.map((p) => p.name);

            const newDescription = (description ??
              existingGame.description) as string;

            try {
              const embedding = await generateGameEmbedding({
                name: newName,
                genres: newGenreNames,
                description: newDescription,
                platforms: newPlatformNames,
              });

              game.embedding = embedding.data[0].embedding;
            } catch (error) {
              console.error('Embedding generation failed (update):', error);
            }
          }

          return query(args);
        },
      },
    },
  });
}

type ConfiguredPrismaClient = ReturnType<typeof configurePrismaClient>;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private client: ConfiguredPrismaClient;

  constructor() {
    super();

    this.client = configurePrismaClient();

    return new Proxy(this, {
      get: (target, property) => {
        if (property in target.client) {
          return target.client[property];
        }
        return target[property];
      },
    });
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
