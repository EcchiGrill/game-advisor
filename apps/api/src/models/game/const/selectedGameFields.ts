import { GameResponse } from '../types/gameResponse';

export const selectedGameFields: Record<keyof GameResponse, boolean> = {
  id: true,
  name: true,
  slug: true,
  description: true,
  playtime: true,
  rating: true,
  metacritic: true,
  coverUrl: true,
  genres: true,
  platforms: true,
  releasedAt: true,
  updatedAt: true,
  createdAt: true,
};
