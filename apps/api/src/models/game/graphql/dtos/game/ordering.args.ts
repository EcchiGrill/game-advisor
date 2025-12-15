import { registerEnumType } from '@nestjs/graphql';
import { OrderingDirection } from 'src/types/enums/orderingDirection';
import { OrderingValue } from 'src/types/enums/orderingValue';

registerEnumType(OrderingValue, {
  name: 'GameOrderingValue',
});

registerEnumType(OrderingDirection, {
  name: 'GameOrderingDirection',
});
