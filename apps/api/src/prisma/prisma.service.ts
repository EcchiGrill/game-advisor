import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Game, PrismaClient } from '@prisma/client';
import { findGame } from 'src/lib/utils/game/findGame';
import { generateGameDescription } from 'src/lib/utils/game/generateGameDescription';
import { generateGameEmbedding } from 'src/lib/utils/game/generateGameEmbedding';

function configurePrismaClient() {
  return new PrismaClient().$extends({
    query: {
      game: {
        async create({ args, query }) {
          const game = args.data as Game;

          const { name, genres, description, platforms } = game;

          if (!description || description === '') {
            try {
              const generatedDescription = await generateGameDescription(
                name,
                genres
              );

              game.description = generatedDescription;
            } catch (error) {
              console.error('Description generation failed:', error);
            }
          }

          try {
            const embedding = await generateGameEmbedding({
              name,
              genres,
              description,
              platforms,
            });
            game.embedding = embedding.data[0].embedding;
          } catch (error) {
            console.error('Embedding generation failed:', error);
          }

          return query(args);
        },

        async upsert({ args, query }) {
          const game = args.create as Game;

          const { name, genres, description, platforms } = game;

          const existingGame = await findGame(args);

          if (!existingGame) {
            if (!description || description === '') {
              try {
                const generatedDescription = await generateGameDescription(
                  name,
                  genres
                );

                game.description = generatedDescription;
              } catch (error) {
                console.error('Description generation failed (upsert):', error);
              }
            }

            try {
              const embedding = await generateGameEmbedding({
                name,
                genres,
                description,
                platforms,
              });

              game.embedding = embedding.data[0].embedding;
            } catch (error) {
              console.error('Embedding generation failed (upsert):', error);
            }
          }

          return query(args);
        },

        async update({ args, query }) {
          const game = args.data as Game;

          const existingGame = await findGame(args);

          const { name, genres, description, platforms } = game;

          const affectedFields = ['name', 'description', 'genres', 'platforms'];

          const shouldBeEmbedded = affectedFields.some(
            (field) => field in game
          );

          if (name && name !== existingGame?.name) {
            try {
              const generatedDescription = await generateGameDescription(
                name,
                genres
              );

              game.description = generatedDescription;
            } catch (error) {
              console.error('Description generation failed (update):', error);
            }
          }

          if (shouldBeEmbedded && existingGame) {
            const newName = (name ?? existingGame.name) as string;

            const newGenres = (genres ?? existingGame.genres) as string[];

            const newPlatforms = (platforms ??
              existingGame.platforms) as string[];

            const newDescription = (description ??
              existingGame.description) as string;

            try {
              const embedding = await generateGameEmbedding({
                name: newName,
                genres: newGenres,
                description: newDescription,
                platforms: newPlatforms,
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
