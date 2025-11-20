import { IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Ordering } from '../../../types/ordering';

enum OrderingValue {
  name = 'name',
  released = 'released',
  added = 'added',
  created = 'created',
  updated = 'updated',
  rating = 'rating',
  metacritic = 'metacritic',
}

const ORDERING_DIRECTIONS = ['+', '-'] as const;
const ORDERING_VALUES = Object.values(OrderingValue);

export const ORDERINGS = ORDERING_DIRECTIONS.flatMap((direction) =>
  ORDERING_VALUES.map(
    (value) => `${direction}${value}` as Ordering<OrderingValue>
  )
);

export class LoadRawgQueryDto {
  @ApiProperty({
    description:
      'Order results by a field. Use + for ascending or - for descending',
    example: '-released',
    required: false,
    enum: ORDERINGS,
  })
  @IsOptional()
  @IsIn(ORDERINGS, {
    message: 'Ordering must be a valid field optionally prefixed with + or -',
  })
  ordering?: Ordering<OrderingValue>;
}
