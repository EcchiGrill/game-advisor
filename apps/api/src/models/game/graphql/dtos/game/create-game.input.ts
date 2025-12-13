import { InputType, PickType } from '@nestjs/graphql';
import { Game } from '../../entities/game.entity';

@InputType()
export class CreateGameInput extends PickType(
  Game,
  [
    'name',
    'slug',
    'description',
    'playtime',
    'rating',
    'metacritic',
    'coverUrl',
    'genres',
    'platforms',
    'releasedAt',
    'platforms',
  ],
  InputType
) {}
