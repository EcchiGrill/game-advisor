import {
  ArgsType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { OrderByInput } from './order-by.args';
import { Prisma } from '@prisma/client';

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@ArgsType()
class GamesArgsStrict implements Prisma.GameFindManyArgs {
  @Field(() => [OrderByInput])
  orderBy: OrderByInput[];
}

@ArgsType()
export class GamesArgs extends PartialType(GamesArgsStrict) {}
