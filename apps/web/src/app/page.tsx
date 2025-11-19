'use client';

import { AIAdvisor } from '@/components/AIAdvisor';
import { AnimatedBackground } from '@/components/common/AnimatedBackground';
import { Header } from '@/components/common/Header';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success(`Game found!: ${prompt}`);
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <AIAdvisor onSubmit={handleSubmit} loading={isLoading} />
      <AnimatedBackground loading={isLoading} />
    </>
  );
}
