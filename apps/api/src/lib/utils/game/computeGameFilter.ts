import { Prisma } from '@prisma/client';
import { GameFilters } from '../../../types/game/gameFilters';

type WhereInput = Prisma.GameWhereInput;

export const computeGameFilter = (
  filters?: GameFilters
): Prisma.GameFindManyArgs => {
  if (!filters) {
    return {};
  }

  const where: WhereInput = {};
  const AND: WhereInput[] = [];

  if (filters.search) {
    AND.push({
      OR: [{ name: { contains: filters.search, mode: 'insensitive' } }],
    });
  }

  const genresArray = filters.genres
    ? filters.genres
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean)
    : undefined;

  if (genresArray && genresArray.length > 0) {
    AND.push({
      genres: {
        some: {
          name: {
            in: genresArray,
          },
        },
      },
    });
  }

  const platformsArray = filters.platforms
    ? filters.platforms
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean)
    : undefined;

  if (platformsArray && platformsArray.length > 0) {
    AND.push({
      platforms: {
        some: {
          name: {
            in: platformsArray,
          },
        },
      },
    });
  }

  if (filters.ratingMin !== undefined || filters.ratingMax !== undefined) {
    const ratingFilter: Prisma.IntFilter = {};
    if (filters.ratingMin !== undefined) {
      ratingFilter.gte = Number(filters.ratingMin);
    }
    if (filters.ratingMax !== undefined) {
      ratingFilter.lte = Number(filters.ratingMax);
    }
    AND.push({ rating: ratingFilter });
  }

  if (
    filters.metacriticMin !== undefined ||
    filters.metacriticMax !== undefined
  ) {
    const metacriticFilter: Prisma.IntNullableFilter = {};
    if (filters.metacriticMin !== undefined) {
      metacriticFilter.gte = Number(filters.metacriticMin);
    }
    if (filters.metacriticMax !== undefined) {
      metacriticFilter.lte = Number(filters.metacriticMax);
    }
    AND.push({ metacritic: metacriticFilter });
  }

  if (filters.playtimeMin !== undefined || filters.playtimeMax !== undefined) {
    const playtimeFilter: Prisma.IntFilter = {};
    if (filters.playtimeMin !== undefined) {
      playtimeFilter.gte = Number(filters.playtimeMin);
    }
    if (filters.playtimeMax !== undefined) {
      playtimeFilter.lte = Number(filters.playtimeMax);
    }
    AND.push({ playtime: playtimeFilter });
  }

  if (filters.releasedFrom || filters.releasedTo) {
    const releasedAtFilter: Prisma.DateTimeFilter = {};
    if (filters.releasedFrom) {
      releasedAtFilter.gte = new Date(filters.releasedFrom);
    }
    if (filters.releasedTo) {
      releasedAtFilter.lte = new Date(filters.releasedTo);
    }
    AND.push({ releasedAt: releasedAtFilter });
  }

  if (AND.length > 0) {
    where.AND = AND;
  }

  const query: Prisma.GameFindManyArgs = {
    where: Object.keys(where).length > 0 ? where : undefined,
  };

  if (filters.skip !== undefined) {
    query.skip = Number(filters.skip);
  }
  if (filters.take !== undefined) {
    query.take = Number(filters.take);
  }

  return query;
};
