import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GameService } from '../game.service';
import { LoadRawgBodyDto } from './dtos/rawg/body.dto';
import { LoadRawgQueryDto } from './dtos/rawg/query.dto';
import { Game } from './entities/game.entity';
import { Prisma } from '@prisma/client';
import { GameQueryDto } from './dtos/game/game.query.dto';
import { orderingMapper } from '../../../lib/utils/rawg/orderingMapper';
import { AdviceBodyDto } from './dtos/advice.body.dto';
import { CreateGameDto } from './dtos/game/create-game.dto';
import { UpdateGameDto } from './dtos/game/update-game.dto';
import { GameResponse } from '../../../types/gameResponse';

interface LoadRawgGamesResponse {
  message: string;
  totalLoaded: number;
  totalFound: number;
  totalPages: number;
}

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

  @Get(':slug')
  @ApiOkResponse({
    description: 'Get game by slug',
    type: Game,
  })
  async getGame(@Param('slug') slug: string): Promise<GameResponse> {
    return await this.gameService.getGame(slug);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create game',
    type: Game,
  })
  async createGame(@Body() body: CreateGameDto): Promise<GameResponse> {
    return await this.gameService.createGame(body);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update game by id',
    type: Game,
  })
  async updateGame(
    @Param('id') id: string,
    @Body() body: UpdateGameDto
  ): Promise<GameResponse> {
    return await this.gameService.updateGame(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Remove game by id',
    type: Game,
  })
  async removeGame(@Param('id') id: string): Promise<GameResponse> {
    return await this.gameService.removeGame(id);
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
