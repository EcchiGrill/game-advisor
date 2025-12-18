'use client';

import { AIAdvisor } from '@/components/AIAdvisor';
import { AnimatedBackground } from '@/components/common/AnimatedBackground';
import { Header } from '@/components/common/Header';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <>
      <Header />
      <AIAdvisor onLoadingChange={handleLoadingChange} loading={isLoading} />
      <AnimatedBackground loading={isLoading} />
    </>
  );
}
