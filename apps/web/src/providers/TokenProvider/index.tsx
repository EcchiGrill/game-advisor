'use client';

import { ReactNode } from 'react';
import './tokenProvider';

interface TokenProviderProps {
  children: ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
  return <>{children}</>;
}
