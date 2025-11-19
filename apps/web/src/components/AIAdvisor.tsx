'use client';

import { SendHorizontal } from 'lucide-react';
import { Textarea } from './ui/Textarea';
import { useState } from 'react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

interface AIAdvisorProps {
  onSubmit: (prompt: string) => Promise<void>;
  loading: boolean;
}

export const AIAdvisor = ({ onSubmit, loading }: AIAdvisorProps) => {
  const [prompt, setPrompt] = useState('');

  return (
    <div
      className={cn(
        'flex flex-col gap-16 items-center justify-center h-[calc(100vh-80px)] opacity-85 transition-opacity duration-500',
        loading && 'opacity-0'
      )}
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
          cols={120}
          rows={6}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="max-w-[900px]"
          placeholder="Find it now!"
        />
        <Button
          variant={'ghost'}
          size={'icon'}
          className="absolute bottom-4 right-4 text-secondary"
          onClick={() => onSubmit(prompt)}
        >
          <SendHorizontal className="min-h-6 min-w-6" />
        </Button>
      </div>
    </div>
  );
};
