import {
  ArgsType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { OrderByInput } from './order-by.args';
import { Prisma } from '@prisma/client';
import { SortOrder } from '../../../types/sortOrder';

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
