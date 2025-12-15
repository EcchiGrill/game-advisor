import { OrderingValue } from 'src/types/enums/orderingValue';
import { Ordering } from 'src/types/ordering';

const ORDERING_DIRECTIONS = ['+', '-'] as const;
const ORDERING_VALUES = Object.values(OrderingValue);

export const ORDERINGS = ORDERING_DIRECTIONS.flatMap((direction) =>
  ORDERING_VALUES.map((value) => `${direction}${value}` as Ordering)
);
