import { InputType, PickType } from '@nestjs/graphql';
import { Genre } from '../entities/genre.entity';

@InputType()
export class CreateGenreInput extends PickType(Genre, ['name'], InputType) {}
