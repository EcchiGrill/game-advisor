import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Game as GameType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Game implements GameType {
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
    example: 'thse-witcher-3-wild-hunt',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 100,
  })
  @IsNumber()
  playtime: number;

  @ApiProperty({
    example: 4.5,
  })
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: 95,
    required: false,
  })
  @IsOptional()
  @IsNumber()
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
