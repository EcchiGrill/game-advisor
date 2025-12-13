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

export class UpdateGameDto {
  @ApiProperty({
    example: 'The Witcher 3: Wild Hunt',
    description: 'Name of the game',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'the-witcher-3-wild-hunt',
    description: 'URL-friendly slug',
    required: false,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 'An open-world RPG adventure',
    description: 'Game description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 50,
    description: 'Average playtime in hours',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  playtime?: number;

  @ApiProperty({
    example: 4.5,
    description: 'Game rating (0-5)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

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
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genres?: string[];

  @ApiProperty({
    example: ['PC', 'PlayStation 5', 'Xbox Series X'],
    description: 'Available platforms',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  platforms?: string[];

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Release date',
    type: Date,
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  releasedAt?: Date;

  @ApiProperty({
    example: [0.1, 0.2, 0.3],
    description: 'Embedding vector for semantic search',
    required: false,
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  embedding?: number[];
}
