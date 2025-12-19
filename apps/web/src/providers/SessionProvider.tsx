'use client';

import {
  SessionProvider as Provider,
  SessionProviderProps,
} from 'next-auth/react';

export const SessionProvider = (props: SessionProviderProps) => {
  return <Provider {...props} />;
};
