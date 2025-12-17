import { Platform, Prisma } from '@prisma/client';
import { SELECTED_GAME_FIELDS } from 'src/const/selectedGameFields';
import { GameWithRelations } from '../game/gameWithRelations';

type RawGameWithRelations = Omit<
  Prisma.GameGetPayload<{
    include: typeof SELECTED_GAME_FIELDS;
  }>,
  'embedding'
>;

export interface RawPreferences {
  platforms: Platform[];
  favoriteGames: RawGameWithRelations[];
  completedGames: RawGameWithRelations[];
  chosenGames: RawGameWithRelations[];
  bannedGames: RawGameWithRelations[];
}

export interface Preferences {
  platforms: string[];
  favoriteGames: GameWithRelations[];
  completedGames: GameWithRelations[];
  chosenGames: GameWithRelations[];
  bannedGames: GameWithRelations[];
}
