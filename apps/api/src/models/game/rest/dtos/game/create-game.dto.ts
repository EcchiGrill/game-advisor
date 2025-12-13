import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGameDto {
  @ApiProperty({
    example: 'The Witcher 3: Wild Hunt',
    description: 'Name of the game',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'the-witcher-3-wild-hunt',
    description: 'URL-friendly slug',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 'An open-world RPG adventure',
    description: 'Game description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 50,
    description: 'Average playtime in hours',
  })
  @IsNumber()
  playtime: number;

  @ApiProperty({
    example: 4.5,
    description: 'Game rating (0-5)',
  })
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: 92,
    description: 'Metacritic score',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  metacritic?: number;

  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    description: 'Cover image URL',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  coverUrl?: string;

  @ApiProperty({
    example: ['Action', 'RPG', 'Adventure'],
    description: 'Game genres',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @ApiProperty({
    example: ['PC', 'PlayStation 5', 'Xbox Series X'],
    description: 'Available platforms',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  platforms: string[];

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Release date',
    type: Date,
  })
  @Type(() => Date)
  @IsDate()
  releasedAt: Date;
}
