import { ApiPropertyOptional } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdatePreferenceDto {
  @ApiPropertyOptional({
    description: 'Platform names to set as preferred',
    example: ['PC', 'PlayStation 5'],
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  platforms?: string[];

  @ApiPropertyOptional({
    description: 'Game IDs to add to favorites',
    example: ['uuid-1', 'uuid-2'],
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteGameIds?: string[];

  @ApiPropertyOptional({
    description: 'Game IDs to mark as completed',
    example: ['uuid-1', 'uuid-2'],
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  completedGameIds?: string[];

  @ApiPropertyOptional({
    description: 'Game IDs marked as chosen (recommended by AI)',
    example: ['uuid-1', 'uuid-2'],
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  chosenGameIds?: string[];

  @ApiPropertyOptional({
    description: 'Game IDs to ban from recommendations',
    example: ['uuid-1', 'uuid-2'],
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bannedGameIds?: string[];
}
