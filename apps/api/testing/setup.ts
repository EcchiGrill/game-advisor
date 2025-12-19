import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function setupTestDatabase() {
  await prisma.feedback.deleteMany();
  await prisma.preference.deleteMany();
  await prisma.game.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.platform.deleteMany();
  await prisma.user.deleteMany();
}

export async function cleanupTestDatabase() {
  await prisma.$transaction(async (tx) => {
    await tx.feedback.deleteMany();
    await tx.preference.deleteMany();
    await tx.game.deleteMany();
    await tx.genre.deleteMany();
    await tx.platform.deleteMany();
    await tx.user.deleteMany();
  });
}

export async function teardownTestDatabase() {
  await prisma.$disconnect();
}

export { prisma };
