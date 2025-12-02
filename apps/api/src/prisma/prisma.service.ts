import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { delay } from '../lib/delay';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function configurePrismaClient() {
  return new PrismaClient().$extends({
    query: {
      game: {
        async create({ args, query }) {
          const { data } = args;

          if (!data.description || data.description === '') {
            try {
              const prompt = `Write a concise 2-3 sentence description for the video game "${data.name}". Answer in plain text.`;

              const completion = await openai.chat.completions.create({
                model: 'gpt-4.1-mini',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 150,
              });

              const description = completion.choices[0].message.content?.trim();

              data.description = description;

              await delay(1000);
            } catch (error) {
              console.error('Description generation failed:', error);
            }
          }

          const genres = data.genres as string[];
          const platforms = data.platforms as string[];

          const text = `${data.name}. Genres: ${genres.join(', ')}. Platforms: ${platforms.join(', ')}.`;

          try {
            const embedding = await openai.embeddings.create({
              model: 'text-embedding-3-small',
              input: text,
            });

            data.embedding = embedding.data[0].embedding;
          } catch (error) {
            console.error('Embedding generation failed:', error);
          }

          return query(args);
        },

        async upsert({ args, query }) {
          const prismaClient = new PrismaClient();

          const existingGame = await prismaClient.game.findUnique({
            where: args.where,
          });

          await prismaClient.$disconnect();

          const createData = args.create;

          if (!existingGame) {
            if (!createData.description || createData.description === '') {
              try {
                const prompt = `Write a concise 2-3 sentence description for the video game "${createData.name}". Answer in plain text.`;

                const completion = await openai.chat.completions.create({
                  model: 'gpt-4.1-mini',
                  messages: [{ role: 'user', content: prompt }],
                  max_tokens: 150,
                });

                const description =
                  completion.choices[0].message.content?.trim();
                createData.description = description;

                await delay(1000);
              } catch (error) {
                console.error('Description generation failed (upsert):', error);
              }
            }

            const genres = createData.genres as string[];
            const platforms = createData.platforms as string[];
            const text = `${createData.name}. Genres: ${genres.join(', ')}. Platforms: ${platforms.join(', ')}.`;

            try {
              const embedding = await openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: text,
              });

              createData.embedding = embedding.data[0].embedding;
            } catch (err) {
              console.error('Embedding generation failed (upsert):', err);
            }
          }

          return query(args);
        },

        async update({ args, query }) {
          const data = args.data;

          const prismaClient = new PrismaClient();
          const existingGame = await prismaClient.game.findUnique({
            where: args.where,
          });
          await prismaClient.$disconnect();

          const affects = ['name', 'description', 'genres', 'platforms'];

          const shouldBeEmbedded = affects.some((field) => field in data);

          if (data.name && data.name !== existingGame?.name) {
            try {
              const prompt = `Write a concise 2-3 sentence description for the video game "${data.name}". Answer in plain text.`;

              const completion = await openai.chat.completions.create({
                model: 'gpt-4.1-mini',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 150,
              });

              const description = completion.choices[0].message.content?.trim();
              data.description = description;

              await delay(1000);
            } catch (error) {
              console.error('Description generation failed (update):', error);
            }
          }

          if (shouldBeEmbedded && existingGame) {
            const name = data.name ?? existingGame.name;
            const genres = (data.genres ?? existingGame.genres) as string[];
            const platforms = (data.platforms ??
              existingGame.platforms) as string[];

            const text = `${name}. Genres: ${genres.join(', ')}. Platforms: ${platforms.join(', ')}.`;

            try {
              const embedding = await openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: text,
              });

              data.embedding = embedding.data[0].embedding;
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
