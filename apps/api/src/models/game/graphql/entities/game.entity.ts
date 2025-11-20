import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Game as GameType } from '@prisma/client';

@ObjectType()
export class Game implements GameType {
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
  @IsNumber()
  playtime: number;

  @Field()
  @IsNumber()
  rating: number;

  @Field()
  @IsNumber()
  @IsOptional()
  metacritic: number;

  @Field()
  @IsUrl()
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
