import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsIn } from 'class-validator';
import { ORDERINGS } from 'src/const/orderings';
import { Ordering } from 'src/types/game/ordering';

export class GameOrderingDto {
  @ApiProperty({
    description:
      'Order results by a field. Use + for ascending or - for descending',
    example: '+name',
    required: false,
    enum: ORDERINGS,
  })
  @IsOptional()
  @IsIn(ORDERINGS, {
    message: 'Ordering must be a valid field optionally prefixed with + or -',
  })
  orderBy?: Ordering;
}
