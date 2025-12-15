import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { Genre as GenreType } from '@prisma/client';

@ObjectType()
export class Genre implements GenreType {
  @Field()
  @IsUUID()
  @IsString()
  id: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
