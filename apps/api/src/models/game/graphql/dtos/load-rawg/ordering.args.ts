import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { SortOrder } from '../../../../../types/sortOrder';

@InputType()
class OrderingInputStrict implements Prisma.GameOrderByWithRelationInput {
  @Field(() => SortOrder)
  name: SortOrder;

  @Field(() => SortOrder)
  released: SortOrder;

  @Field(() => SortOrder)
  added: SortOrder;

  @Field(() => SortOrder)
  created: SortOrder;

  @Field(() => SortOrder)
  rating: SortOrder;

  @Field(() => SortOrder)
  updated: SortOrder;

  @Field(() => SortOrder)
  metacritic: SortOrder;
}

@InputType()
export class OrderingInput extends PartialType(OrderingInputStrict) {}
