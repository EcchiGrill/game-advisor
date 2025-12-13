import { Prisma, PrismaClient } from '@prisma/client';

export const findGame = async (args: Prisma.GameFindUniqueArgs) => {
  const prismaClient = new PrismaClient();

  const game = await prismaClient.game.findUnique({
    where: args.where,
  });

  await prismaClient.$disconnect();

  return game;
};
