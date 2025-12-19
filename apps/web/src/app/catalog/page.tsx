'use client';

import { useState, useEffect, useRef, startTransition } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Slider } from '@/components/ui/Slider';
import { Search, SlidersHorizontal, Filter, CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Calendar } from '@/components/ui/Calendar';
import { format } from 'date-fns';
import { useQuery } from '@apollo/client/react';
import {
  GamesDocument,
  GenresDocument,
  PlatformsDocument,
  RawgOrderingDirection,
  RawgOrderingValue,
} from 'game-advisor_network';
import { DateRange } from 'react-day-picker';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from '@/components/ui/Select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
import { itemsPerPage } from '@/constants/itemsPerPage';
import { sortings } from '@/constants/sortings';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { reduceLabel } from '@/lib/game/reduceLabel';
import { GameCard } from '@/components/GameCard';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [ratingRange, setRatingRange] = useState<number[]>([1, 5]);
  const [metacriticRange, setMetacriticRange] = useState<number[]>([0, 100]);
  const [playtimeRange, setPlaytimeRange] = useState<number[]>([0, 500]);
  const [releaseDateRange, setReleaseDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: new Date(new Date().getFullYear() - 20, 0, 1),
    to: new Date(),
  });
  const [genreSearch, setGenreSearch] = useState('');
  const [platformSearch, setPlatformSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [sorting, setSorting] = useState<{
    value: RawgOrderingValue;
    direction: RawgOrderingDirection;
  }>({
    value: sortings[0].value as RawgOrderingValue,
    direction: sortings[0].direction as RawgOrderingDirection,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const prevFiltersRef = useRef<string>('');

  const filterSignature = JSON.stringify({
    searchQuery,
    selectedGenres,
    selectedPlatforms,
    ratingRange,
    metacriticRange,
    playtimeRange,
    releasedFrom: releaseDateRange.from?.toISOString(),
    releasedTo: releaseDateRange.to?.toISOString(),
    orderBy: sorting.value,
    orderDirection: sorting.direction,
  });

  const { data: gamesData } = useQuery(GamesDocument, {
    variables: {
      orderBy: sorting.value,
      orderDirection: sorting.direction,
      filter: {
        genres: selectedGenres.join(','),
        platforms: selectedPlatforms.join(','),
        ratingMin: ratingRange[0],
        ratingMax: ratingRange[1],
        metacriticMin: metacriticRange[0],
        metacriticMax: metacriticRange[1],
        playtimeMin: playtimeRange[0],
        playtimeMax: playtimeRange[1],
        releasedFrom: releaseDateRange.from?.toISOString(),
        releasedTo: releaseDateRange.to?.toISOString(),
        search: searchQuery,
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
      },
    },
  });

  const games = gamesData?.games || [];
  const hasMorePages = games.length === itemsPerPage;

  const { data: genresData } = useQuery(GenresDocument);
  const genres = genresData?.genres || [];

  const { data: platformsData } = useQuery(PlatformsDocument);
  const platforms = platformsData?.platforms || [];

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setRatingRange([1, 5]);
    setMetacriticRange([0, 100]);
    setPlaytimeRange([0, 500]);
    setReleaseDateRange({
      from: new Date(new Date().getFullYear() - 20, 0, 1),
      to: new Date(),
    });
    setGenreSearch('');
    setPlatformSearch('');
    setCurrentPage(1);
  };

  useEffect(() => {
    if (prevFiltersRef.current && prevFiltersRef.current !== filterSignature) {
      startTransition(() => {
        setCurrentPage(1);
      });
    }
    prevFiltersRef.current = filterSignature;
  }, [filterSignature]);

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(genreSearch.toLowerCase())
  );
  const filteredPlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(platformSearch.toLowerCase())
  );

  const activeFiltersCount =
    (selectedGenres.length > 0 ? 1 : 0) +
    (selectedPlatforms.length > 0 ? 1 : 0) +
    (ratingRange[0] !== 1 || ratingRange[1] !== 5 ? 1 : 0) +
    (metacriticRange[0] !== 0 || metacriticRange[1] !== 100 ? 1 : 0) +
    (playtimeRange[0] !== 0 || playtimeRange[1] !== 500 ? 1 : 0) +
    (releaseDateRange.from?.getFullYear() !== new Date().getFullYear() - 20 ||
    releaseDateRange.to?.getFullYear() !== new Date().getFullYear()
      ? 1
      : 0);

  return (
    <div className="min-h-screen bg-primary text-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">
            Game Catalog
          </h1>
          <p className="text-contrast">
            Discover and explore our collection of games
          </p>
        </div>

        <div className="flex gap-6">
          <div
            className={`${
              isFilterOpen ? 'max-w-[350px]' : 'w-0'
            } transition-all duration-300 overflow-hidden bg-primary/50`}
          >
            <div className="bg-card border border-secondary/10 rounded-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-secondary flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-secondary mb-3">
                    Rating
                  </h3>
                  <div className="flex gap-2 items-center mb-3">
                    <Input
                      type="number"
                      value={ratingRange[0]}
                      onChange={(e) =>
                        setRatingRange([Number(e.target.value), ratingRange[1]])
                      }
                      min={1}
                      max={5}
                      className="h-10 text-center bg-primary border-secondary/20 text-secondary"
                    />
                    <span className="text-contrast">-</span>
                    <Input
                      type="number"
                      value={ratingRange[1]}
                      onChange={(e) =>
                        setRatingRange([ratingRange[0], Number(e.target.value)])
                      }
                      min={1}
                      max={5}
                      className="h-10 text-center bg-primary border-secondary/20 text-secondary"
                    />
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    value={ratingRange}
                    onValueChange={setRatingRange}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-secondary mb-3">
                    Metacritic Score
                  </h3>
                  <div className="flex gap-2 items-center mb-3">
                    <Input
                      type="number"
                      value={metacriticRange[0]}
                      onChange={(e) =>
                        setMetacriticRange([
                          Number(e.target.value),
                          metacriticRange[1],
                        ])
                      }
                      min={0}
                      max={100}
                      className="h-10 text-center bg-primary border-secondary/20 text-secondary"
                    />
                    <span className="text-contrast">-</span>
                    <Input
                      type="number"
                      value={metacriticRange[1]}
                      onChange={(e) =>
                        setMetacriticRange([
                          metacriticRange[0],
                          Number(e.target.value),
                        ])
                      }
                      min={0}
                      max={100}
                      className="h-10 text-center bg-primary border-secondary/20 text-secondary"
                    />
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={metacriticRange}
                    onValueChange={setMetacriticRange}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-secondary mb-3">
                    Playtime (hours)
                  </h3>
                  <div className="flex gap-2 items-center mb-3">
                    <Input
                      type="number"
                      value={playtimeRange[0]}
                      onChange={(e) =>
                        setPlaytimeRange([
                          Number(e.target.value),
                          playtimeRange[1],
                        ])
                      }
                      min={0}
                      max={500}
                      className="h-10 text-center bg-primary border-secondary/20 text-secondary"
                    />
                    <span className="text-contrast">-</span>
                    <Input
                      type="number"
                      value={playtimeRange[1]}
                      onChange={(e) =>
                        setPlaytimeRange([
                          playtimeRange[0],
                          Number(e.target.value),
                        ])
                      }
                      min={0}
                      max={500}
                      className="h-10 text-center bg-primary border-secondary/20 text-secondary"
                    />
                  </div>
                  <Slider
                    min={0}
                    max={500}
                    step={5}
                    value={playtimeRange}
                    onValueChange={setPlaytimeRange}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-secondary mb-3">
                    Release Date
                  </h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-primary border-secondary/20 text-secondary hover:bg-secondary/5"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {releaseDateRange.from ? (
                          releaseDateRange.to ? (
                            <>
                              {format(releaseDateRange.from, 'MMM dd, yyyy')} -{' '}
                              {format(releaseDateRange.to, 'MMM dd, yyyy')}
                            </>
                          ) : (
                            format(releaseDateRange.from, 'MMM dd, yyyy')
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-primary border-secondary/20"
                      align="start"
                    >
                      <Calendar
                        mode="range"
                        selected={releaseDateRange as DateRange}
                        onSelect={(range) =>
                          setReleaseDateRange(
                            range || { from: undefined, to: undefined }
                          )
                        }
                        numberOfMonths={2}
                        defaultMonth={releaseDateRange.from}
                        className="bg-primary text-secondary"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary mb-3">
                    Genres
                    {selectedGenres.length > 0 && (
                      <span className="ml-2 text-xs text-contrast">
                        ({selectedGenres.length})
                      </span>
                    )}
                  </h3>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-contrast" />
                    <Input
                      type="text"
                      placeholder="Search genres..."
                      value={genreSearch}
                      onChange={(e) => setGenreSearch(e.target.value)}
                      className="mb-3 bg-primary border-secondary/20 text-secondary placeholder:text-contrast h-10 pl-10"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 max-h-64 overflow-x-hidden">
                    {filteredGenres.map((genre) => {
                      const genreName = reduceLabel(genre.name, 6);

                      return (
                        <Tooltip key={genre.id}>
                          <TooltipTrigger asChild>
                            <Button
                              key={genre.id}
                              variant="outline"
                              size="md"
                              onClick={() => toggleGenre(genre.name)}
                              className={
                                selectedGenres.includes(genre.name)
                                  ? 'bg-secondary text-primary border-secondary hover:bg-secondary/90 h-10 text-xs'
                                  : 'border-secondary/20 text-contrast hover:bg-secondary/5 bg-transparent h-10 text-xs'
                              }
                            >
                              {genreName}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{genre.name}</TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary mb-3">
                    Platforms
                    {selectedPlatforms.length > 0 && (
                      <span className="ml-2 text-xs text-contrast">
                        ({selectedPlatforms.length})
                      </span>
                    )}
                  </h3>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-contrast" />
                    <Input
                      type="text"
                      placeholder="Search platforms..."
                      value={platformSearch}
                      onChange={(e) => setPlatformSearch(e.target.value)}
                      className="pl-10 mb-3 bg-primary border-secondary/20 text-secondary placeholder:text-contrast h-10"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {filteredPlatforms.map((platform) => {
                      const platformName = reduceLabel(platform.name, 6);

                      return (
                        <Tooltip key={platform.id}>
                          <TooltipTrigger asChild>
                            <Button
                              key={platform.id}
                              variant="outline"
                              size="sm"
                              onClick={() => togglePlatform(platform.name)}
                              className={
                                selectedPlatforms.includes(platform.name)
                                  ? 'bg-secondary text-primary border-secondary hover:bg-secondary/90 h-10 text-xs'
                                  : 'border-secondary/20 text-contrast hover:bg-secondary/5 bg-transparent h-10 text-xs'
                              }
                            >
                              {platformName}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{platform.name}</TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1 min-w-0">
            <div className="mb-6 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-contrast" />
                <Input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-primary border-secondary/10 text-secondary placeholder:text-contrast h-11"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={`${sorting.value}-${sorting.direction}`}
                  onValueChange={(selectedValue) => {
                    const [value, direction] = selectedValue.split('-');
                    setSorting({
                      value: value as RawgOrderingValue,
                      direction: direction as RawgOrderingDirection,
                    });
                  }}
                >
                  <SelectTrigger className="h-full border-secondary/20">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortings.map((sorting) => (
                      <SelectItem
                        key={`${sorting.value}-${sorting.direction}`}
                        value={`${sorting.value}-${sorting.direction}`}
                      >
                        {sorting.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="border-secondary/20 text-contrast hover:bg-secondary/5 px-4"
                >
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  {isFilterOpen ? 'Hide' : 'Show'} Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-error text-secondary">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
            <div className="mb-4 text-sm text-contrast">
              {games.length} game{games.length !== 1 ? 's' : ''} found
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            {games.length > 0 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                  {currentPage > 1 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {currentPage > 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}
                  <PaginationItem>
                    <PaginationLink isActive className="cursor-default">
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  {hasMorePages && (
                    <>
                      {currentPage === 1 && (
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(2);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="cursor-pointer"
                          >
                            2
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      {hasMorePages && currentPage > 1 && (
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage + 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="cursor-pointer"
                          >
                            {currentPage + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                    </>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (hasMorePages) {
                          setCurrentPage(currentPage + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={
                        !hasMorePages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
            {games.length === 0 && (
              <div className="text-center py-16">
                <div className="text-contrast/50 text-6xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  No games found
                </h3>
                <p className="text-contrast mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-secondary/20 text-contrast hover:bg-secondary/5 bg-transparent"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
