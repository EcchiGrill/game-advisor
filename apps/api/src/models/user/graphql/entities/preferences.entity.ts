import { Field, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/models/game/graphql/entities/game.entity';

@ObjectType()
export class Preferences {
  @Field(() => [String])
  platforms: string[];

  @Field(() => [Game])
  favoriteGames: Game[];

  @Field(() => [Game])
  completedGames: Game[];

  @Field(() => [Game])
  chosenGames: Game[];

  @Field(() => [Game])
  bannedGames: Game[];
}
