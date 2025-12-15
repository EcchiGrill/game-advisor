import { Game } from '@prisma/client';

export interface GameWithRelations extends Game {
  genres: string[];
  platforms: string[];
}
