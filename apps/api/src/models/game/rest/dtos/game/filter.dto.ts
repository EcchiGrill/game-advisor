import {
  IsOptional,
  IsString,
  IsInt,
  IsDateString,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GameFilters } from 'src/types/game/gameFilters';

export class GameFilterDto implements GameFilters {
  @ApiProperty({
    description: 'Search query to filter games by name, slug, or description',
    example: 'witcher',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filter by genre names (comma-separated)',
    example: 'Action,Adventure',
    required: false,
  })
  @IsOptional()
  @IsString()
  genres?: string;

  @ApiProperty({
    description: 'Filter by platform names (comma-separated)',
    example: 'PC,PlayStation 5',
    required: false,
  })
  @IsOptional()
  @IsString()
  platforms?: string;

  @ApiProperty({
    description: 'Minimum rating (0-5)',
    example: 3,
    required: false,
    minimum: 0,
    maximum: 5,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(5)
  ratingMin?: number;

  @ApiProperty({
    description: 'Maximum rating (0-5)',
    example: 5,
    required: false,
    minimum: 0,
    maximum: 5,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(5)
  ratingMax?: number;

  @ApiProperty({
    description: 'Minimum metacritic score (0-100)',
    example: 80,
    required: false,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  metacriticMin?: number;

  @ApiProperty({
    description: 'Maximum metacritic score (0-100)',
    example: 100,
    required: false,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  metacriticMax?: number;

  @ApiProperty({
    description: 'Minimum playtime in hours',
    example: 10,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  playtimeMin?: number;

  @ApiProperty({
    description: 'Maximum playtime in hours',
    example: 100,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  playtimeMax?: number;

  @ApiProperty({
    description: 'Filter by release date from (ISO 8601 format)',
    example: '2020-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  releasedFrom?: string;

  @ApiProperty({
    description: 'Filter by release date to (ISO 8601 format)',
    example: '2024-12-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  releasedTo?: string;

  @ApiProperty({
    description: 'Number of items to skip (for pagination)',
    example: 0,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  skip?: number;

  @ApiProperty({
    description: 'Number of items to take (for pagination)',
    example: 20,
    required: false,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  take?: number;
}
