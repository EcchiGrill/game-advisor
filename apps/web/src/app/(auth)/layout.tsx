import { AnimatedBackground } from '@/components/common/AnimatedBackground';
import { Header } from '@/components/common/Header';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <AnimatedBackground />
    </>
  );
}
