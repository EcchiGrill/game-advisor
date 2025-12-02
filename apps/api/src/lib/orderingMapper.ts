import { Prisma } from '@prisma/client';
import { Ordering } from '../models/game/types/ordering';

/**
 * Maps ordering string format (e.g., '+name', '-rating') to Prisma's GameOrderByWithRelationInput
 * @param ordering - The ordering string with + (ascending) or - (descending) prefix
 * @returns Prisma GameOrderByWithRelationInput object
 */
export function orderingMapper(
  ordering?: Ordering
): Prisma.GameOrderByWithRelationInput {
  if (!ordering) return;

  const direction = ordering[0] as '+' | '-';
  const field = ordering.slice(1);

  const prismaDirection: Prisma.SortOrder = direction === '+' ? 'asc' : 'desc';

  return {
    [field]: prismaDirection,
  } as Prisma.GameOrderByWithRelationInput;
}
