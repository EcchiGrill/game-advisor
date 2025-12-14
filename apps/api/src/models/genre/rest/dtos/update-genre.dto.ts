import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateGenreDto {
  @ApiProperty({
    example: 'Action',
    description: 'The name of the genre',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
