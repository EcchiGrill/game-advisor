import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';

export const createServerApolloClient = (token?: string) =>
  new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
      fetch,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    }),
    cache: new InMemoryCache(),
  });
