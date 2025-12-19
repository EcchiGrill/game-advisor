'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useMutation, useQuery } from '@apollo/client/react';
import { formatDate } from '@/lib/game/formatDate';
import {
  GameDocument,
  ProfileDocument,
  UpdateProfileDocument,
} from 'game-advisor_network';
import { SiMetacritic } from 'react-icons/si';
import { useSession } from 'next-auth/react';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data: session } = useSession();

  const { data: gameData } = useQuery(GameDocument, {
    variables: {
      slug,
    },
  });

  const { data: profileData } = useQuery(ProfileDocument);
  const [updateProfile, { loading }] = useMutation(UpdateProfileDocument);

  const game = gameData?.game;

  if (!game) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-secondary mb-4">
            Game not found
          </h1>
          <Button onClick={() => router.push('/catalog')} variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  const profilePreferences = profileData?.profile.preferences;

  const isBanned = profileData?.profile.preferences.bannedGames.some(
    (bannedGame) => bannedGame.id === game!.id
  );
  const isFavorite = profileData?.profile.preferences.favoriteGames.some(
    (favoriteGame) => favoriteGame.id === game!.id
  );
  const isCompleted = profileData?.profile.preferences.completedGames.some(
    (completedGame) => completedGame.id === game!.id
  );

  const handleBan = async () => {
    let bannedGameIds =
      profilePreferences?.bannedGames.map((bannedGame) => bannedGame.id) ?? [];

    if (isBanned) {
      bannedGameIds = bannedGameIds.filter(
        (bannedGameId) => bannedGameId !== game!.id
      );
    } else {
      bannedGameIds.push(game!.id);
    }

    await updateProfile({
      variables: {
        input: {
          preferences: { bannedGameIds },
        },
      },
    });
  };

  const handleFavorite = async () => {
    let favoriteGameIds =
      profilePreferences?.favoriteGames.map(
        (favoriteGame) => favoriteGame.id
      ) ?? [];

    if (isFavorite) {
      favoriteGameIds = favoriteGameIds.filter(
        (favoriteGameId) => favoriteGameId !== game!.id
      );
    } else {
      favoriteGameIds.push(game!.id);
    }

    await updateProfile({
      variables: {
        input: {
          preferences: { favoriteGameIds },
        },
      },
    });
  };

  const handleComplete = async () => {
    let completedGameIds =
      profilePreferences?.completedGames.map(
        (completedGame) => completedGame.id
      ) ?? [];

    if (isCompleted) {
      completedGameIds = completedGameIds.filter(
        (completedGameId) => completedGameId !== game!.id
      );
    } else {
      completedGameIds.push(game!.id);
    }

    await updateProfile({
      variables: {
        input: {
          preferences: {
            completedGameIds,
          },
        },
      },
    });
  };

  const releaseDate = formatDate(game?.releasedAt);

  return (
    <div className="min-h-screen bg-primary text-secondary">
      <div className="absolute top-32 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/catalog')}
            className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </div>
      </div>

      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={game.coverUrl ?? ''}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold text-secondary mb-4 text-balance">
              {game.name}
            </h1>
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="secondary"
                className="bg-error text-base px-4 py-1.5 text-secondary font-semibold hover:bg-error/80 hover:text-secondary transition-all duration-200"
              >
                <Star className="w-3 h-3 mr-1 fill-current" />
                {game.rating}/5
              </Badge>{' '}
              {game.metacritic && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-300 text-base px-4 py-1.5 text-primary font-semibold hover:bg-yellow-300/80 hover:text-primary transition-all duration-200"
                >
                  <SiMetacritic className="w-3 h-3 mr-1" />
                  {game.metacritic}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-secondary/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-contrast mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Released</span>
              </div>
              <p className="text-secondary font-semibold">{releaseDate}</p>
            </div>

            <div className="bg-card border border-secondary/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-contrast mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Playtime</span>
              </div>
              <p className="text-secondary font-semibold">
                {game.playtime} hours
              </p>
            </div>

            <div className="bg-card border border-secondary/10 rounded-lg p-4 col-span-2">
              <div className="text-contrast text-sm mb-1">Platforms</div>
              <div className="flex flex-wrap gap-1">
                {game.platforms.slice(0, 2).map((platform, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs border-secondary/20 text-contrast"
                  >
                    {platform}
                  </Badge>
                ))}
                {game.platforms.length > 2 && (
                  <Badge
                    variant="outline"
                    className="text-xs border-secondary/20 text-contrast"
                  >
                    +{game.platforms.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="bg-card border border-secondary/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-secondary mb-4">About</h2>
            <p className="text-contrast text-lg leading-relaxed">
              {game.description}
            </p>
          </div>
          <div className="bg-card border border-secondary/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-secondary mb-4">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {game.genres.map((genre, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          {session?.user && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleFavorite}
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-lg text-secondary border-yellow-300 hover:border-yellow-300/80"
                disabled={loading}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              <Button
                onClick={handleComplete}
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-lg"
                disabled={loading}
              >
                {isCompleted ? 'Remove from Completed' : 'Mark as Completed'}
              </Button>
              <Button
                onClick={handleBan}
                variant="outline"
                size="lg"
                className="flex-1 border-error/50 text-error hover:text-error/80 hover:border-error/80 h-14 text-lg bg-transparent"
                disabled={loading}
              >
                {isBanned ? 'Unban' : 'Ban'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
