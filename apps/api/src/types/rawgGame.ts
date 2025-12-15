interface RawgPlatformItem {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

interface RawgGenre {
  id: number;
  name: string;
  slug: string;
}

export interface RawgGame {
  id: number;
  slug: string;
  name: string;
  playtime: number;
  rating: number;
  metacritic?: number | null;
  background_image?: string | null;
  background_image_additional?: string | null;
  genres: RawgGenre[];
  platforms: RawgPlatformItem[];
  released: string;
}
