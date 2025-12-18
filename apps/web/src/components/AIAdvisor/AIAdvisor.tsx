'use client';

import { SendHorizontal } from 'lucide-react';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import { AiAdvisorData } from './ai-advisor.schema';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aiAdvisorSchema } from './ai-advisor.schema';
import { useMutation } from '@apollo/client/react';
import {
  AdviceGameDocument,
  UpdateProfileDocument,
  AiValue,
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

  const [skippedGames, setSkippedGames] = useState<string[]>([]);

  const [chosenGames, setChosenGames] = useLocalStorage<string[]>(
    'chosenGames',
    []
  );

  const [
    adviceGame,
    { data: adviceGameData, loading: isAdviceLoading, error, reset },
  ] = useMutation(AdviceGameDocument);

  const [updateProfile, { loading: isUpdateProfileLoading }] = useMutation(
    UpdateProfileDocument
  );

  const prompt = useWatch({ control, name: 'prompt' });
  const model = useWatch({ control, name: 'model' });

  const game = adviceGameData?.adviceGame;
  const isGameLoading = isAdviceLoading || isUpdateProfileLoading;
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

  const handleBan = () => {
    updateProfile({
      variables: { input: { preferences: { bannedGameIds: [game!.id] } } },
    });
    adviceGame({
      variables: { prompt, skippedGames: excludedGames, ai: model },
    });
  };

  const handleChoose = () => {
    updateProfile({
      variables: { input: { preferences: { chosenGameIds: [game!.id] } } },
    });
    const updatedChosenGames = new Set([...chosenGames, game!.name]);
    setChosenGames(Array.from(updatedChosenGames));
    onLoadingChange(false);
  };

  useEffect(() => {
    const errorMessage = error?.message || errors.prompt?.message;

    if (errorMessage) {
      onLoadingChange(false);
      toast.error(errorMessage);
      reset();
    }
  }, [error, errors, onLoadingChange, reset]);

  return (
    <>
      <div
        className={cn(
          'flex flex-col gap-16 items-center justify-center h-[calc(100vh-80px)] opacity-85 transition-opacity duration-500',
          loading && 'opacity-0'
        )}
        role="form"
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
            className="max-w-[900px]"
            placeholder="Find it now!"
          />
          <Select
            value={model}
            onValueChange={(value) => setValue('model', value as AiValue)}
          >
            <SelectTrigger className="w-40 absolute left-4 bottom-4 bg-transparent">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={AiValue.Openai}>gpt-4.1-mini</SelectItem>
              <SelectItem value={AiValue.Gemini}>gemini-2.5-flash</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={'ghost'}
            size={'icon'}
            className="absolute bottom-4 right-4 text-secondary"
            onClick={handleSubmit(onSubmit)}
            disabled={isGameLoading}
          >
            <SendHorizontal className="min-h-6 min-w-6" />
          </Button>
        </div>
      </div>
      {!isGameLoading && loading && game && (
        <GameCard
          game={game}
          onClose={() => onLoadingChange(false)}
          onSkip={handleSkip}
          onBan={handleBan}
          onChoose={handleChoose}
        />
      )}
    </>
  );
};
