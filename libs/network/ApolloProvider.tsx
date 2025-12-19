'use client';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { authFetch } from './authFetch';
import { ApolloProvider as Provider } from '@apollo/client/react';

export const ApolloProvider = ({ children }) => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
      fetch: authFetch,
    }),
    cache: new InMemoryCache(),
  });

  return <Provider client={client}>{children}</Provider>;
};
