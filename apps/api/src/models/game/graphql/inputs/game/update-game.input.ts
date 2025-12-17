import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Game } from '../../entities/game.entity';

@InputType()
export class UpdateGameInput extends PartialType(
  PickType(
    Game,
    [
      'name',
      'slug',
      'playtime',
      'rating',
      'metacritic',
      'coverUrl',
      'genres',
      'platforms',
      'releasedAt',
      'platforms',
      'description',
    ],
    InputType
  )
) {}
