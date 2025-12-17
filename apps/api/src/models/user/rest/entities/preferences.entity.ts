import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/models/game/rest/entities/game.entity';
import { Preferences as PreferencesType } from 'src/types/user/preferences';

export class Preferences implements PreferencesType {
  @ApiProperty({
    description: 'Preferred platforms',
    type: [String],
  })
  platforms: string[];

  @ApiProperty({
    description: 'Favorite games',
    type: [Game],
  })
  favoriteGames: Game[];

  @ApiProperty({
    description: 'Completed games',
    type: [Game],
  })
  completedGames: Game[];

  @ApiProperty({
    description: 'AI-chosen games',
    type: [Game],
  })
  chosenGames: Game[];

  @ApiProperty({
    description: 'Banned games (excluded from recommendations)',
    type: [Game],
  })
  bannedGames: Game[];
}
