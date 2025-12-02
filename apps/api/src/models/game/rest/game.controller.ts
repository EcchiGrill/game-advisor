import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GameService } from '../game.service';
import { LoadRawgBodyDto } from './dtos/load-rawg/body.dto';
import { LoadRawgQueryDto } from './dtos/load-rawg/query.dto';
import { Game } from './entities/game.entity';
import { Prisma } from '@prisma/client';
import { GameQueryDto } from './dtos/game.query.dto';
import { orderingMapper } from '../../../lib/orderingMapper';
import { AdviceBodyDto } from './dtos/advice.body.dto';

interface LoadRawgGamesResponse {
  message: string;
  totalLoaded: number;
  totalFound: number;
  totalPages: number;
}

type GameResponse = Omit<Game, 'embedding'>;

@ApiTags('Game')
@Controller('game')
@UsePipes(new ValidationPipe())
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all games',
    type: [Game],
  })
  async getGames(@Query() query: GameQueryDto): Promise<GameResponse[]> {
    const prismaQuery: Prisma.GameFindManyArgs = {
      orderBy: orderingMapper(query.orderBy),
    };
    return await this.gameService.getGames(prismaQuery);
  }

  @Post('advice')
  @ApiOkResponse({
    description:
      'Get AI advice for a game based on user prompt and preferences',
    type: [Game],
  })
  async adviceGame(@Body() body: AdviceBodyDto): Promise<GameResponse> {
    return await this.gameService.adviceGame(body);
  }

  @Post('load-rawg')
  @ApiCreatedResponse({
    description: 'Load RAWG games into the database',
    example: {
      message:
        'Finished import. Total loaded: 20. Total found: 20. Total pages: 1',
      totalLoaded: 20,
      totalFound: 20,
      totalPages: 1,
    },
  })
  @HttpCode(201)
  async loadRawgGames(
    @Query() query: LoadRawgQueryDto,
    @Body() body: LoadRawgBodyDto
  ): Promise<LoadRawgGamesResponse> {
    return await this.gameService.loadRawgGames({ body, query });
  }

  @Post('load-rawg/:search')
  @ApiCreatedResponse({
    description: 'Load RAWG game into the database',
    example: Game,
  })
  @HttpCode(201)
  async loadRawgGame(
    @Param('search') search: string
  ): Promise<Prisma.GameCreateInput> {
    return await this.gameService.loadRawgGame(search);
  }
}
