import { Prisma, PrismaClient } from '@prisma/client';

export const createTestGame = async (
  prisma: PrismaClient,
  overrides?: Prisma.GameCreateInput
) => {
  return prisma.game.create({
    data: {
      name: 'Test Game',
      slug: 'test-game',
      description: 'A test game description',
      playtime: 10,
      rating: 4,
      metacritic: 85,
      coverUrl: 'https://example.com/cover.jpg',
      releasedAt: new Date('2023-01-01'),
      genres: {
        create: [{ name: 'Action' }],
      },
      platforms: {
        create: [{ name: 'PC' }],
      },
      ...overrides,
    },
    include: {
      genres: true,
      platforms: true,
    },
  });
};
