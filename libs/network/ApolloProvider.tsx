'use client';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as Provider } from '@apollo/client/react';
import { ReactNode } from 'react';

export interface ApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  const link = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return <Provider client={client}>{children}</Provider>;
};
