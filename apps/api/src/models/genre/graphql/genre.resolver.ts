import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { GenreService } from '../genre.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './inputs/create-genre.input';
import { UpdateGenreInput } from './inputs/update-genre.input';

@Resolver(() => Genre)
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Query(() => [Genre], { name: 'genres' })
  async getGenres() {
    return this.genreService.getGenres();
  }

  @Mutation(() => Genre)
  async createGenre(@Args('input') input: CreateGenreInput) {
    return this.genreService.createGenre(input);
  }

  @Mutation(() => Genre)
  async updateGenre(
    @Args('id') id: string,
    @Args('input') input: UpdateGenreInput
  ) {
    return this.genreService.updateGenre(id, input);
  }

  @Mutation(() => Genre)
  async removeGenre(@Args('id') id: string) {
    return this.genreService.removeGenre(id);
  }
}
