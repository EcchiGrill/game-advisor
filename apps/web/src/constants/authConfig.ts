import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sessionMaxAge } from './sessionMaxAge';
import { createServerApolloClient } from '@/lib/apollo/createServerApolloClient';
import {
  LoginDocument,
  ProfileDocument,
  User as NetworkUser,
} from 'game-advisor_network';

type SafeNetworkUser = Omit<NetworkUser, 'preferences'>;

declare module 'next-auth' {
  interface Session {
    user: SafeNetworkUser & { accessToken: string };
  }

  interface User extends SafeNetworkUser {
    accessToken: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: SafeNetworkUser & { accessToken: string };
  }
}

const normalizeUser = (profile: SafeNetworkUser) => {
  return {
    email: profile.email,
    username: profile.username,
    avatarUrl: profile.avatarUrl,
    isEmailConfirmed: profile.isEmailConfirmed,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;

        const unauthClient = createServerApolloClient();

        const response = await unauthClient.mutate({
          mutation: LoginDocument,
          variables: {
            input: {
              email: credentials.identifier,
              password: credentials.password,
            },
          },
        });

        const accessToken = response.data?.login.accessToken;

        if (!accessToken) return null;

        const authClient = createServerApolloClient(accessToken);

        const { data: profileData } = await authClient.query({
          query: ProfileDocument,
          fetchPolicy: 'no-cache',
        });

        const profile = profileData?.profile;

        if (!profile) return null;

        return {
          ...normalizeUser(profile),
          id: profile.id,
          accessToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.user = {
          ...user,
          id: user.id,
        };
      }

      if (trigger === 'update') {
        const authClient = createServerApolloClient(token.user.accessToken);

        const { data: profileData } = await authClient.query({
          query: ProfileDocument,
          fetchPolicy: 'no-cache',
        });

        const profile = profileData?.profile;

        if (profile) {
          token.user = {
            ...normalizeUser(profile),
            accessToken: token.user.accessToken,
            id: token.user.id,
          };
        }
      }

      return token;
    },

    async session({ token, session }) {
      if (token.user) {
        session.user = {
          ...token.user,
          id: token.user.id,
        };
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: sessionMaxAge,
  },
};
