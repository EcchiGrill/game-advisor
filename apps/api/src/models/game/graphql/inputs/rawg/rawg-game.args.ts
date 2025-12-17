import {
  ArgsType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { OrderingDirection } from 'src/types/enums/orderingDirection';
import { OrderingValue } from 'src/types/enums/orderingValue';

registerEnumType(OrderingValue, {
  name: 'RawgOrderingValue',
});

registerEnumType(OrderingDirection, {
  name: 'RawgOrderingDirection',
});

@ArgsType()
class RawgGameArgsStrict {
  @Field(() => OrderingValue, { nullable: true })
  orderBy?: OrderingValue;

  @Field(() => OrderingDirection, { nullable: true })
  orderDirection?: OrderingDirection;

  @Field(() => Number)
  limit: number;
}

@ArgsType()
export class RawgGameArgs extends PartialType(RawgGameArgsStrict) {}
