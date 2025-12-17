import { Game } from '@prisma/client';

export interface GameWithRelations extends Omit<Game, 'embedding'> {
  genres: string[];
  platforms: string[];
}
