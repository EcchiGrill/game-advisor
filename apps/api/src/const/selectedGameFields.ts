import { Prisma } from '@prisma/client';

export const SELECTED_GAME_FIELDS = {
  id: true,
  name: true,
  slug: true,
  description: true,
  playtime: true,
  rating: true,
  metacritic: true,
  coverUrl: true,
  genres: {
    select: {
      name: true,
    },
  },
  platforms: {
    select: {
      name: true,
    },
  },
  releasedAt: true,
  updatedAt: true,
  createdAt: true,
} satisfies Prisma.GameSelect;
