import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RawgResponse {
  @Field()
  message: string;

  @Field(() => Int)
  totalLoaded: number;

  @Field(() => Int)
  totalFound: number;

  @Field(() => Int)
  totalPages: number;
}
