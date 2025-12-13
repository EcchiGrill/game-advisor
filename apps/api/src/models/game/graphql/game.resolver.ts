import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Game } from './entities/game.entity';
import { GamesArgs } from './dtos/game/games.args';
import { GameService } from '../game.service';
import { LoadRawgGamesArgs } from './dtos/load-rawg/load-rawg-games.args';
import { AdviceGameArgs } from './dtos/advice.args';
import { LoadRawgResponse } from './entities/load-rawg-response.entity';
import { CreateGameInput } from './dtos/game/create-game.input';
import { UpdateGameInput } from './dtos/game/update-game.input';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => [Game], { name: 'games' })
  loadGames(@Args() args: GamesArgs) {
    return this.gameService.getGames(args);
  }

  @Query(() => Game, { name: 'game' })
  async getGame(@Args('slug', { type: () => String }) slug: string) {
    const game = await this.gameService.getGame(slug);
    return game;
  }

  @Mutation(() => Game, { name: 'createGame' })
  createGame(@Args('input') input: CreateGameInput) {
    return this.gameService.createGame(input);
  }

  @Mutation(() => Game, { name: 'updateGame' })
  updateGame(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateGameInput
  ) {
    return this.gameService.updateGame(id, input);
  }

  @Mutation(() => Game, { name: 'removeGame' })
  removeGame(@Args('id', { type: () => String }) id: string) {
    return this.gameService.removeGame(id);
  }

  @Mutation(() => Game, { name: 'adviceGame' })
  async adviceGame(@Args() args: AdviceGameArgs) {
    return this.gameService.adviceGame(args);
  }

  @Mutation(() => LoadRawgResponse, { name: 'loadRawgGames' })
  loadRawgGames(@Args() args: LoadRawgGamesArgs) {
    const ordering =
      args.orderBy && args.orderDirection
        ? `${args.orderDirection}${args.orderBy}`
        : undefined;

    return this.gameService.loadRawgGames({
      body: { limit: args.limit },
      query: { ordering },
    });
  }

  @Mutation(() => Game, { name: 'loadRawgGame' })
  loadRawgGame(@Args('search', { type: () => String }) search: string) {
    return this.gameService.loadRawgGame(search);
  }
}
