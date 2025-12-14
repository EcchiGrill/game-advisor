import { Game } from '@prisma/client';

interface GameWithRelations extends Omit<Game, 'embedding'> {
  genres: { name: string }[];
  platforms: { name: string }[];
}

export const normalizeGame = (game: GameWithRelations) => {
  const genres = game.genres.map((g) => g.name);
  const platforms = game.platforms.map((p) => p.name);

  return {
    ...game,
    genres,
    platforms,
  };
};
