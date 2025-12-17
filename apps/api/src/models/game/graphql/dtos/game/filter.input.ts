import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { GameFilters } from 'src/types/game/gameFilters';

@InputType()
export class GameFilterInput implements GameFilters {
  @Field(() => String, {
    nullable: true,
    description: 'Search query to filter games by name, slug, or description',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Filter by genre names',
  })
  @IsOptional()
  @IsString()
  genres?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Filter by platform names',
  })
  @IsOptional()
  @IsString()
  platforms?: string;

  @Field(() => Int, {
    nullable: true,
    description: 'Minimum rating (0-5)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  ratingMin?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Maximum rating (0-5)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  ratingMax?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Minimum metacritic score (0-100)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  metacriticMin?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Maximum metacritic score (0-100)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  metacriticMax?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Minimum playtime in hours',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  playtimeMin?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Maximum playtime in hours',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  playtimeMax?: number;

  @Field(() => String, {
    nullable: true,
    description: 'Filter by release date from (ISO 8601 format)',
  })
  @IsOptional()
  @IsString()
  releasedFrom?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Filter by release date to (ISO 8601 format)',
  })
  @IsOptional()
  @IsString()
  releasedTo?: string;

  @Field(() => Int, {
    nullable: true,
    description: 'Number of items to skip (for pagination)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Number of items to take (for pagination)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  take?: number;
}
