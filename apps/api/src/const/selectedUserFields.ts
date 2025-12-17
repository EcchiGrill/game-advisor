import { SELECTED_GAME_FIELDS } from './selectedGameFields';
import { Prisma } from '@prisma/client';

export const SELECTED_USER_FIELDS = {
  id: true,
  username: true,
  email: true,
  avatarUrl: true,
  isEmailConfirmed: true,
  createdAt: true,
  updatedAt: true,
  preferences: {
    select: {
      platforms: true,
      favoriteGames: {
        select: SELECTED_GAME_FIELDS,
      },
      completedGames: {
        select: SELECTED_GAME_FIELDS,
      },
      chosenGames: {
        select: SELECTED_GAME_FIELDS,
      },
      bannedGames: {
        select: SELECTED_GAME_FIELDS,
      },
    },
  },
} satisfies Prisma.UserSelect;
