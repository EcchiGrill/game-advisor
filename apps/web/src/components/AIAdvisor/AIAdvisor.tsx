'use client';

import { SendHorizontal } from 'lucide-react';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import { AiAdvisorData } from './ai-advisor.schema';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aiAdvisorSchema } from './ai-advisor.schema';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  AdviceGameDocument,
  AiValue,
  ProfileDocument,
  UpdateProfileDocument,
} from 'game-advisor_network';
import { useEffect, useState } from 'react';
import { GameCard } from '../GameCard';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useSession } from 'next-auth/react';

const aiModels = [
  {
    value: AiValue.Openai,
    label: 'gpt-4.1-mini',
  },
  {
    value: AiValue.Gemini,
    label: 'gemini-2.5-flash',
  },
];

interface AIAdvisorProps {
  loading: boolean;
  onLoadingChange: (loading: boolean) => void;
}

export const AIAdvisor = ({ loading, onLoadingChange }: AIAdvisorProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AiAdvisorData>({
    resolver: zodResolver(aiAdvisorSchema),
    defaultValues: {
      prompt: '',
      model: AiValue.Openai,
    },
  });

  const { data: session, update: updateSession } = useSession();

  const [skippedGames, setSkippedGames] = useState<string[]>([]);

  const [chosenGames, setChosenGames] = useLocalStorage<string[]>(
    'chosenGames',
    []
  );

  const [
    adviceGame,
    { data: adviceGameData, loading: isAdviceLoading, error },
  ] = useMutation(AdviceGameDocument);

  const [updateProfile] = useMutation(UpdateProfileDocument);
  const { data: profileData } = useQuery(ProfileDocument);

  const prompt = useWatch({ control, name: 'prompt' });
  const model = useWatch({ control, name: 'model' });

  const game = adviceGameData?.adviceGame;
  const excludedGames = [...chosenGames, ...skippedGames];

  const onSubmit = () => {
    onLoadingChange(true);
    adviceGame({
      variables: { prompt, skippedGames: excludedGames, ai: model },
    });
  };

  const handleSkip = () => {
    const updatedExcludedGames = new Set([...excludedGames, game!.name]);
    setSkippedGames(Array.from(updatedExcludedGames));
    adviceGame({
      variables: {
        prompt,
        skippedGames: Array.from(updatedExcludedGames),
        ai: model,
      },
    });
  };

  const handleBan = async () => {
    if (session?.user) {
      await updateProfile({
        variables: {
          input: {
            preferences: {
              bannedGameIds: [
                ...(profileData?.profile.preferences.bannedGames.map(
                  (game) => game.id
                ) ?? []),
                game!.id,
              ],
            },
          },
        },
      });
      await updateSession();
      await adviceGame({
        variables: { prompt, skippedGames: excludedGames, ai: model },
      });
    }
  };

  const handleChoose = async () => {
    if (session?.user) {
      await updateProfile({
        variables: {
          input: {
            preferences: {
              chosenGameIds: [
                ...(profileData?.profile.preferences.chosenGames.map(
                  (game) => game.id
                ) ?? []),
                game!.id,
              ],
            },
          },
        },
      });
      await updateSession();
    }
    const updatedChosenGames = new Set([...chosenGames, game!.name]);
    setChosenGames(Array.from(updatedChosenGames));
    onLoadingChange(false);
  };

  useEffect(() => {
    const errorMessage = error?.message || errors.prompt?.message;

    if (errorMessage) {
      onLoadingChange(false);
      toast.error(errorMessage);
    }
  }, [error, errors, onLoadingChange]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <>
      <form
        className={cn(
          'flex flex-col gap-16 items-center justify-center h-[calc(100vh-80px)] opacity-85 transition-opacity duration-500',
          loading && 'opacity-0'
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 text-center">
          <h2 className="font-bold text-6xl text-secondary">
            What game I would play today?
          </h2>
          <h3 className="text-2xl text-contrast">
            Find the best choice with a single prompt.
          </h3>
        </div>
        <div className="relative">
          <Textarea
            {...register('prompt')}
            cols={120}
            rows={6}
            className="max-w-[900px] min-h-44"
            placeholder="Find it now!"
          />
          <Select
            value={model}
            onValueChange={(value) => setValue('model', value as AiValue)}
          >
            <SelectTrigger className="w-40 absolute left-4 bottom-4 bg-[#040404]">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              {aiModels.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            variant={'ghost'}
            size={'icon'}
            className="absolute bottom-4 right-4 text-secondary"
            disabled={isAdviceLoading}
          >
            <SendHorizontal className="min-h-6 min-w-6" />
          </Button>
        </div>
      </form>
      {!isAdviceLoading && loading && game && (
        <GameCard
          game={game}
          onClose={() => onLoadingChange(false)}
          onSkip={handleSkip}
          onBan={session?.user && handleBan}
          onChoose={handleChoose}
        />
      )}
    </>
  );
};
