import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { GameWithRelations } from '../../../../types/gameWithRelations';
import { ApiProperty } from '@nestjs/swagger';

export class Game implements GameWithRelations {
  @ApiProperty({
    example: '4e8b9963-f72d-4887-9678-48c3ff26d60e',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'The Witcher 3: Wild Hunt',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'the-witcher-3-wild-hunt',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 'This is a description of the game.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 100,
  })
  @IsNumber()
  playtime: number;

  @ApiProperty({
    example: 4.5,
  })
  @IsNumber({
    maxDecimalPlaces: 1,
  })
  rating: number;

  @ApiProperty({
    example: 95,
    required: false,
  })
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  @Max(100, {
    message: 'Metacritic score must be less than or equal to 100',
  })
  @Min(0, {
    message: 'Metacritic score must be greater than or equal to 0',
  })
  @IsOptional()
  metacritic: number;

  @ApiProperty({
    example: 'https://example.com/cover.jpg',
  })
  @IsUrl()
  coverUrl: string;

  @ApiProperty({
    example: ['Action', 'Adventure', 'RPG'],
  })
  @IsString({ each: true })
  genres: string[];

  @ApiProperty({
    example: ['PC', 'PS4', 'Xbox One'],
  })
  @IsString({ each: true })
  platforms: string[];

  embedding: number[];

  @ApiProperty({
    example: '2015-05-19',
  })
  @IsDate()
  releasedAt: Date;

  @ApiProperty({
    example: '2015-05-19',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2015-05-19',
  })
  @IsDate()
  updatedAt: Date;
}
