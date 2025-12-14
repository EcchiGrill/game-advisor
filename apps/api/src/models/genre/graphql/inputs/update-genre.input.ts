import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Genre } from '../entities/genre.entity';

@InputType()
export class UpdateGenreInput extends PartialType(
  PickType(Genre, ['name'], InputType)
) {}
