export interface GameFilters {
  search?: string;
  genres?: string;
  platforms?: string;
  ratingMin?: number;
  ratingMax?: number;
  metacriticMin?: number;
  metacriticMax?: number;
  playtimeMin?: number;
  playtimeMax?: number;
  releasedFrom?: string;
  releasedTo?: string;
  skip?: number;
  take?: number;
}
