import { AIAdvisor } from '@/components/AIAdvisor';
import { AnimatedBackground } from '@/components/common/AnimatedBackground';
import { Header } from '@/components/common/Header';

export default function Home() {
  return (
    <>
      <Header />
      <AIAdvisor />
      <AnimatedBackground />
    </>
  );
}
