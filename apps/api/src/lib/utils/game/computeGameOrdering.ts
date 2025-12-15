import { Prisma } from '@prisma/client';
import { Ordering } from 'src/types/ordering';

/**
 * Computes the ordering for the game query
 * @param ordering - The ordering string with + (ascending) or - (descending) prefix
 */
export function computeGameOrdering(
  ordering?: Ordering
): Prisma.GameOrderByWithRelationInput {
  if (!ordering) return;

  const direction = ordering[0];
  const field = ordering.slice(1);

  const prismaDirection = direction === '+' ? 'asc' : 'desc';

  return field === 'metacritic'
    ? { [field]: { sort: prismaDirection, nulls: 'last' } }
    : { [field]: prismaDirection };
}
