import { PrismaClient } from '@prisma/client';

export async function createTestPlatform(
  prisma: PrismaClient,
  name = 'Test Platform'
) {
  return prisma.platform.create({
    data: { name },
  });
}
