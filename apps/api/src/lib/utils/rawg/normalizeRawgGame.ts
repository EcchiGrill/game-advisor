import { Prisma } from '@prisma/client';
import { RawgGame } from '../../../types/rawgGame';

/**
 * Map a RAWG game into data compatible with Prisma Game model.
 */
export function normalizeRawgGame(game: RawgGame): Prisma.GameCreateInput {
  const coverUrl = game.background_image ?? game.background_image_additional;

  const genres = game.genres?.map((genre) => genre.name).filter(Boolean) ?? [];

  const platforms =
    game.platforms
      ?.map((platform) => platform.platform?.name)
      .filter(Boolean) ?? [];

  const releasedAt = new Date(game.released);

  const data: Prisma.GameCreateInput = {
    name: game.name,
    slug: game.slug,
    description: '',
    playtime: game.playtime,
    rating: game.rating,
    metacritic: game.metacritic,
    coverUrl,
    genres: {
      connectOrCreate: genres.map((name) => ({
        where: { name },
        create: { name },
      })),
    },
    platforms: {
      connectOrCreate: platforms.map((name) => ({
        where: { name },
        create: { name },
      })),
    },
    releasedAt,
  };

  return data;
}
