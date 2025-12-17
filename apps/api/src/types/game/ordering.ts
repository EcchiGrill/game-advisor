import { OrderingDirection } from '../enums/orderingDirection';
import { OrderingValue } from '../enums/orderingValue';

export type Ordering = `${OrderingDirection}${OrderingValue}`;
