import { ArgsType, Field, PartialType } from '@nestjs/graphql';
import { GameFilterInput } from './filter.input';
import { OrderingValue } from 'src/types/enums/orderingValue';
import { OrderingDirection } from 'src/types/enums/orderingDirection';

@ArgsType()
class GameArgsStrict {
  @Field(() => OrderingValue, { nullable: true })
  orderBy?: OrderingValue;

  @Field(() => OrderingDirection, { nullable: true })
  orderDirection?: OrderingDirection;

  @Field(() => GameFilterInput, { nullable: true })
  filter?: GameFilterInput;
}

@ArgsType()
export class GameArgs extends PartialType(GameArgsStrict) {}
