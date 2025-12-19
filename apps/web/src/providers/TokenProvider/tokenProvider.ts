'use client';

import { getSession } from 'next-auth/react';
import { setTokenProvider } from 'game-advisor_network';

setTokenProvider(async () => {
  const session = await getSession();
  return session?.user?.accessToken ?? null;
});
