import { Query, Resolver } from '@nestjs/graphql';
import { GenreService } from '../genre.service';
import { Genre } from './entities/genre.entity';

@Resolver(() => Genre)
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Query(() => [Genre], { name: 'genres' })
  async getGenres() {
    return this.genreService.getGenres();
  }
}
