import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    example: 'Action',
    description: 'The name of the genre',
  })
  @IsString()
  name: string;
}
