'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Ban, X, ThumbsUp, Clock, Calendar, Star } from 'lucide-react';
import type { Game } from 'game-advisor_network';
import { formatDate } from '@/lib/game/formatDate';
import { SiMetacritic } from 'react-icons/si';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface GameCardProps {
  game: Game;
  className?: string;
  onSkip?: () => void;
  onBan?: () => void;
  onChoose?: () => void;
  onClose?: () => void;
}

export const GameCard = ({
  game,
  className,
  onSkip,
  onBan,
  onChoose,
  onClose,
}: GameCardProps) => {
  return (
    <Card className={cn('max-w-xl relative', className)}>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 text-secondary"
        >
          <X className="min-w-8 min-h-5" />
        </Button>
      )}
      <div className="absolute top-5 left-4 flex gap-2 z-10">
        {game.metacritic && (
          <Badge
            variant="secondary"
            className="bg-yellow-300 text-primary font-semibold hover:bg-yellow-300/80 hover:text-primary transition-all duration-200"
          >
            <SiMetacritic className="w-3 h-3 mr-1" />
            {game.metacritic}
          </Badge>
        )}
        <Badge
          variant="secondary"
          className="bg-error text-secondary font-semibold hover:bg-error/80 hover:text-secondary transition-all duration-200"
        >
          <Star className="w-3 h-3 mr-1 fill-current" />
          {game.rating}/5
        </Badge>
      </div>
      <div className="relative h-64 bg-gradient-to-br from-contrast/20 to-primary overflow-hidden">
        {game.coverUrl ? (
          <>
            <Image
              src={game.coverUrl ?? ''}
              alt={game.name}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-contrast/10 to-primary">
            <div className="text-secondary/20 text-7xl font-bold">
              {game.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-secondary line-clamp-2 leading-tight">
          <Link href={`/catalog/${game.slug}`}>{game.name}</Link>
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-contrast mt-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(game.releasedAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{game.playtime} hours</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <CardDescription>{game.description}</CardDescription>

        {game.genres.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1.5">
              {game.genres.slice(0, 3).map((genre, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
              {game.genres.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{game.genres.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {game.platforms.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1.5">
              {game.platforms.slice(0, 4).map((platform, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs hover:bg-secondary/15 hover:text-secondary transition-all duration-200"
                >
                  {platform}
                </Badge>
              ))}
              {game.platforms.length > 4 && (
                <Badge
                  variant="secondary"
                  className="text-xs hover:bg-secondary/15 hover:text-secondary transition-all duration-200"
                >
                  +{game.platforms.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      {onSkip && onBan && onChoose && (
        <CardFooter className="flex gap-2 pb-6">
          {onSkip && (
            <Button
              variant="outline"
              size="lg"
              onClick={onSkip}
              className="flex-1 border-secondary/20 text-contrast hover:bg-secondary/5 hover:border-secondary/30 hover:text-secondary transition-all duration-200 bg-transparent"
            >
              <X className="w-5 h-5 mr-2" />
              Skip
            </Button>
          )}
          {onBan && (
            <Button
              variant="outline"
              size="lg"
              onClick={onBan}
              className="flex-1 border-error/30 text-error hover:bg-error/10 hover:border-error transition-all duration-200 bg-transparent"
            >
              <Ban className="w-5 h-5 mr-2 rotate-180" />
              Ban
            </Button>
          )}
          {onChoose && (
            <Button
              size="lg"
              onClick={onChoose}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-primary transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <ThumbsUp className="w-5 h-5 mr-2" />
              Choose
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
