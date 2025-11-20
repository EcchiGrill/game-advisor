import { Args, Query, Resolver } from '@nestjs/graphql';
import { Game } from './entities/game.entity';
import { GamesArgs } from './dtos/games.args';
import { GameService } from '../game.service';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => [Game], { name: 'games' })
  loadGames(@Args() args: GamesArgs) {
    return this.gameService.getGames(args);
  }
}
