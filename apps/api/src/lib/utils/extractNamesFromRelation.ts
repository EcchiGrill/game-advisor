import { Prisma } from '@prisma/client';

type Relation =
  | Prisma.GameCreateInput['genres']
  | Prisma.GameCreateInput['platforms'];

export const extractNamesFromRelation = (relation?: Relation): string[] => {
  if (!relation) return [];

  if (Array.isArray(relation.connectOrCreate)) {
    return relation.connectOrCreate.map((item) => item.create.name);
  }
  if (Array.isArray(relation.connect)) {
    return relation.connect.map((item) => item.name);
  }
  if (Array.isArray(relation.create)) {
    return relation.create.map((item) => item.name);
  }

  return [];
};
