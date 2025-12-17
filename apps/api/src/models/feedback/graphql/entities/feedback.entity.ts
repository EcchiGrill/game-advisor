import { Field, ObjectType } from '@nestjs/graphql';
import { Feedback as FeedbackType } from '@prisma/client';
import { IsDate, IsString, IsUUID } from 'class-validator';

@ObjectType()
export class Feedback implements FeedbackType {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  recipient: string;

  @Field()
  @IsString()
  content: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
