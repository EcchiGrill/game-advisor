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
import { GameQueryDto } from './dtos/query.dto';
import { orderingMapper } from '../lib/orderingMapper';

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
  async getGames(@Query() query: GameQueryDto): Promise<Game[]> {
    const prismaQuery: Prisma.GameFindManyArgs = {
      orderBy: orderingMapper(query.orderBy),
    };
    return await this.gameService.getGames(prismaQuery);
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
