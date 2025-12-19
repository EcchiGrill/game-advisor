import { PrismaClient } from '@prisma/client';

export async function createTestGenre(
  prisma: PrismaClient,
  name = 'Test Genre'
) {
  return prisma.genre.create({
    data: { name },
  });
}
