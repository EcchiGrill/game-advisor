import { AnimatedBackground } from '@/components/common/AnimatedBackground';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      {children}
      <AnimatedBackground />
    </>
  );
}
