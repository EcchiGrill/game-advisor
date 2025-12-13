import {
  ArgsType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';

enum OrderingValue {
  name = 'name',
  released = 'released',
  added = 'added',
  created = 'created',
  updated = 'updated',
  rating = 'rating',
  metacritic = 'metacritic',
}

enum OrderingDirection {
  asc = '+',
  desc = '-',
}

registerEnumType(OrderingValue, {
  name: 'OrderingValue',
});

registerEnumType(OrderingDirection, {
  name: 'OrderingDirection',
});

@ArgsType()
class LoadRawgGamesArgsStrict {
  @Field(() => OrderingValue, { nullable: true })
  orderBy?: OrderingValue;

  @Field(() => OrderingDirection, { nullable: true })
  orderDirection?: OrderingDirection;

  @Field(() => Number)
  limit: number;
}

@ArgsType()
export class LoadRawgGamesArgs extends PartialType(LoadRawgGamesArgsStrict) {}
