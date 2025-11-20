type OrderingDirection = '+' | '-';

export type Ordering<T extends string = string> = `${OrderingDirection}${T}`;
