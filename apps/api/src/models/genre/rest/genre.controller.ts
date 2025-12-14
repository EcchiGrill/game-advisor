import { Controller, Get, ValidationPipe, UsePipes } from '@nestjs/common';
import { GenreService } from '../genre.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';

@ApiTags('Genre')
@Controller('genre')
@UsePipes(new ValidationPipe())
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all genres',
    type: [Genre],
  })
  async getGenres() {
    return this.genreService.getGenres();
  }
}
