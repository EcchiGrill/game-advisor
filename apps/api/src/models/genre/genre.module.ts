import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreResolver } from './graphql/genre.resolver';
import { GenreController } from './rest/genre.controller';

@Module({
  controllers: [GenreController],
  providers: [GenreResolver, GenreService],
})
export class GenreModule {}
