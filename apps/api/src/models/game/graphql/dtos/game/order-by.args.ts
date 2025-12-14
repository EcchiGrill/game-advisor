import { Field, InputType, PartialType } from '@nestjs/graphql';
import { SortOrder } from '../../../../../types/sortOrder';
import { Prisma } from '@prisma/client';

@InputType()
class OrderByInputStrict implements Prisma.GameOrderByWithRelationInput {
  @Field(() => SortOrder)
  name: SortOrder;

  @Field(() => SortOrder)
  slug: SortOrder;

  @Field(() => SortOrder)
  playtime: SortOrder;

  @Field(() => SortOrder)
  rating: SortOrder;

  @Field(() => SortOrder)
  metacritic: SortOrder;

  @Field(() => SortOrder)
  releasedAt: SortOrder;

  @Field(() => SortOrder)
  createdAt: SortOrder;

  @Field(() => SortOrder)
  updatedAt: SortOrder;
}

@InputType()
export class OrderByInput extends PartialType(OrderByInputStrict) {}
