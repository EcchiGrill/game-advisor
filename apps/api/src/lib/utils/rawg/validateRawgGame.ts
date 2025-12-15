import { Prisma } from '@prisma/client';

export function validateRawgGame(game: Prisma.GameCreateInput): boolean {
  const cutoffYear = new Date().getFullYear() - 20;
  const releaseYear = new Date(game.releasedAt).getFullYear();
  const isOld = releaseYear < cutoffYear;
  const hasLowRating = game.rating < 4;
  const hasLowMetacritic = !game.metacritic || game.metacritic < 90;

  const isTooOld = isOld && hasLowRating && hasLowMetacritic;

  const hasInsufficientData =
    !game.rating && !game.metacritic && !game.playtime;

  const isMobileOnly =
    Array.isArray(game.platforms) &&
    game.platforms.every(
      (platform: string) =>
        platform.toLowerCase().includes('ios') ||
        platform.toLowerCase().includes('android')
    );

  return isTooOld || hasInsufficientData || isMobileOnly;
}
