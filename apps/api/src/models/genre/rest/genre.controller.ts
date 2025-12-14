import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { GenreService } from '../genre.service';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { UpdateGenreDto } from './dtos/update-genre.dto';

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

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new genre',
    type: Genre,
  })
  async createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.createGenre(createGenreDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update a genre by id',
    type: Genre,
  })
  async updateGenre(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto
  ) {
    return this.genreService.updateGenre(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Remove a genre by id',
    type: Genre,
  })
  async removeGenre(@Param('id') id: string) {
    return this.genreService.removeGenre(id);
  }
}
