import { IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Ordering } from 'src/types/ordering';
import { ORDERINGS } from 'src/const/orderings';

export class RawgQueryDto {
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
  ordering?: Ordering;
}
