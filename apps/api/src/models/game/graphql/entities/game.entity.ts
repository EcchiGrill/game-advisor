import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { GameWithRelations } from 'src/types/game/gameWithRelations';

@ObjectType()
export class Game implements GameWithRelations {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  slug: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  playtime: number;

  @Field()
  @IsNumber({
    maxDecimalPlaces: 1,
  })
  rating: number;

  @Field({ nullable: true })
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  @IsOptional()
  metacritic: number;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  coverUrl: string;

  @Field(() => [String])
  @IsString({ each: true })
  genres: string[];

  @Field(() => [String])
  @IsString({ each: true })
  platforms: string[];

  @Field()
  @IsDate()
  releasedAt: Date;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
