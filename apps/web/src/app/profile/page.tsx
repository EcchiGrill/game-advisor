'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Clock, Heart, CheckCircle, Ban } from 'lucide-react';
import { ProfileDocument } from 'game-advisor_network';
import { GameCard } from '@/components/GameCard';
import { useQuery } from '@apollo/client/react';
import { signOut } from 'next-auth/react';
import { AnimatedBackground } from '@/components/common/AnimatedBackground';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('picks');
  const { data: profileData } = useQuery(ProfileDocument);

  const profile = profileData?.profile;

  if (!profile) {
    router.push('/');
    return null;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <Card className="bg-card border-secondary/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="size-32">
              <AvatarImage
                src={profile?.avatarUrl ?? ''}
                alt={profile.username}
              />
              <AvatarFallback className="text-3xl bg-secondary/10 text-secondary">
                {profile.username
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-secondary mb-2">
                    {profile.username}
                  </h1>
                  <p className="text-contrast mb-6">{profile.email}</p>
                </div>
                <Button
                  variant="destructive"
                  size="md"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-primary/50 rounded-lg p-4 border border-secondary/10">
                  <div className="text-2xl font-bold text-error">
                    {profile.preferences.favoriteGames.length}
                  </div>
                  <div className="text-sm text-contrast">Total Picks</div>
                </div>
                <div className="bg-primary/50 rounded-lg p-4 border border-secondary/10">
                  <div className="text-2xl font-bold text-error">
                    {profile.preferences.favoriteGames.length}
                  </div>
                  <div className="text-sm text-contrast">Favorites</div>
                </div>
                <div className="bg-primary/50 rounded-lg p-4 border border-secondary/10">
                  <div className="text-2xl font-bold text-error">
                    {profile.preferences.completedGames.length}
                  </div>
                  <div className="text-sm text-contrast">Completed</div>
                </div>
                <div className="bg-primary/50 rounded-lg p-4 border border-secondary/10">
                  <div className="text-2xl font-bold text-contrast">
                    {profile.preferences.bannedGames.length}
                  </div>
                  <div className="text-sm text-contrast">Banned</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-fit mb-6 gap-2 border border-secondary/10">
            <TabsTrigger value="picks" className="gap-2">
              <Clock className="size-4" />
              Picks History
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="size-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="size-4" />
              Completed
            </TabsTrigger>
            <TabsTrigger value="banned" className="gap-2 opacity-60">
              <Ban className="size-4" />
              Banned
            </TabsTrigger>
          </TabsList>

          <TabsContent value="picks" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {profile.preferences.chosenGames.map((game) => (
                <GameCard key={game.id} game={game} className="w-[350px]" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {profile.preferences.favoriteGames.map((game) => (
                <GameCard key={game.id} game={game} className="w-[350px]" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {profile.preferences.completedGames.map((game) => (
                <GameCard key={game.id} game={game} className="w-[350px]" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="banned" className="mt-0">
            <div className="bg-card border border-secondary/10 rounded-lg p-4 mb-4">
              <p className="text-sm text-contrast">
                These are games you've marked as not interested. They won't
                appear in your recommendations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {profile.preferences.bannedGames.map((game) => (
                <GameCard key={game.id} game={game} className="w-[350px]" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <AnimatedBackground />
    </>
  );
}
