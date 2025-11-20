import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LoadRawgBodyDto {
  @ApiProperty({
    example: 20,
    description: 'Limit the number of games to sync',
    default: 20,
  })
  @IsNumber()
  limit?: number;
}
