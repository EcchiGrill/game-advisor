import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

/** AI provider to use for game advice */
export enum AiValue {
  Gemini = 'gemini',
  Openai = 'openai',
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ConfirmEmailDto = {
  token: Scalars['String']['input'];
};

export type CreateGameInput = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  genres: Array<Scalars['String']['input']>;
  metacritic?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  platforms: Array<Scalars['String']['input']>;
  playtime: Scalars['Int']['input'];
  rating: Scalars['Int']['input'];
  releasedAt: Scalars['DateTime']['input'];
  slug: Scalars['String']['input'];
};

export type CreateGenreInput = {
  name: Scalars['String']['input'];
};

export type CreatePlatformInput = {
  name: Scalars['String']['input'];
};

export type Feedback = {
  __typename?: 'Feedback';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  recipient: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ForgotPasswordDto = {
  email: Scalars['String']['input'];
};

export type Game = {
  __typename?: 'Game';
  coverUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  genres: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metacritic?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  platforms: Array<Scalars['String']['output']>;
  playtime: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  releasedAt: Scalars['DateTime']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GameFilterInput = {
  /** Filter by genre names */
  genres?: InputMaybe<Scalars['String']['input']>;
  /** Maximum metacritic score (0-100) */
  metacriticMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum metacritic score (0-100) */
  metacriticMin?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by platform names */
  platforms?: InputMaybe<Scalars['String']['input']>;
  /** Maximum playtime in hours */
  playtimeMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum playtime in hours */
  playtimeMin?: InputMaybe<Scalars['Int']['input']>;
  /** Maximum rating (0-5) */
  ratingMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum rating (0-5) */
  ratingMin?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by release date from (ISO 8601 format) */
  releasedFrom?: InputMaybe<Scalars['String']['input']>;
  /** Filter by release date to (ISO 8601 format) */
  releasedTo?: InputMaybe<Scalars['String']['input']>;
  /** Search query to filter games by name, slug, or description */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Number of items to skip (for pagination) */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Number of items to take (for pagination) */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Genre = {
  __typename?: 'Genre';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adviceGame: Game;
  changePassword: MessageResponse;
  confirmEmail: MessageResponse;
  createGame: Game;
  createGenre: Genre;
  createPlatform: Platform;
  deleteProfile: MessageResponse;
  forgotPassword: MessageResponse;
  loadRawgGame: Game;
  loadRawgGames: RawgResponse;
  login: AuthResponse;
  register: RegisterResponse;
  removeGame: Game;
  removeGenre: Genre;
  removePlatform: Platform;
  resendConfirmation: MessageResponse;
  resetPassword: MessageResponse;
  submitFeedback: Scalars['String']['output'];
  updateGame: Game;
  updateGenre: Genre;
  updatePlatform: Platform;
  updateProfile: User;
};

export type MutationAdviceGameArgs = {
  ai?: InputMaybe<AiValue>;
  prompt: Scalars['String']['input'];
  skippedGames?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationConfirmEmailArgs = {
  input: ConfirmEmailDto;
};

export type MutationCreateGameArgs = {
  input: CreateGameInput;
};

export type MutationCreateGenreArgs = {
  input: CreateGenreInput;
};

export type MutationCreatePlatformArgs = {
  input: CreatePlatformInput;
};

export type MutationForgotPasswordArgs = {
  input: ForgotPasswordDto;
};

export type MutationLoadRawgGameArgs = {
  search: Scalars['String']['input'];
};

export type MutationLoadRawgGamesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RawgOrderingValue>;
  orderDirection?: InputMaybe<RawgOrderingDirection>;
};

export type MutationLoginArgs = {
  input: LoginDto;
};

export type MutationRegisterArgs = {
  input: RegisterDto;
};

export type MutationRemoveGameArgs = {
  id: Scalars['String']['input'];
};

export type MutationRemoveGenreArgs = {
  id: Scalars['String']['input'];
};

export type MutationRemovePlatformArgs = {
  id: Scalars['String']['input'];
};

export type MutationResendConfirmationArgs = {
  input: ResendConfirmationDto;
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordDto;
};

export type MutationSubmitFeedbackArgs = {
  input: SubmitFeedbackInput;
};

export type MutationUpdateGameArgs = {
  id: Scalars['String']['input'];
  input: UpdateGameInput;
};

export type MutationUpdateGenreArgs = {
  id: Scalars['String']['input'];
  input: UpdateGenreInput;
};

export type MutationUpdatePlatformArgs = {
  id: Scalars['String']['input'];
  input: UpdatePlatformInput;
};

export type MutationUpdateProfileArgs = {
  input: UpdateUserInput;
};

export type Platform = {
  __typename?: 'Platform';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Preferences = {
  __typename?: 'Preferences';
  bannedGames: Array<Game>;
  chosenGames: Array<Game>;
  completedGames: Array<Game>;
  favoriteGames: Array<Game>;
  platforms: Array<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  feedbacks: Array<Feedback>;
  game: Game;
  games: Array<Game>;
  genres: Array<Genre>;
  platforms: Array<Platform>;
  profile: User;
};

export type QueryGameArgs = {
  slug: Scalars['String']['input'];
};

export type QueryGamesArgs = {
  filter?: InputMaybe<GameFilterInput>;
  orderBy?: InputMaybe<RawgOrderingValue>;
  orderDirection?: InputMaybe<RawgOrderingDirection>;
};

export enum RawgOrderingDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum RawgOrderingValue {
  CreatedAt = 'createdAt',
  Metacritic = 'metacritic',
  Name = 'name',
  Playtime = 'playtime',
  Rating = 'rating',
  ReleasedAt = 'releasedAt',
  Slug = 'slug',
  UpdatedAt = 'updatedAt',
}

export type RawgResponse = {
  __typename?: 'RawgResponse';
  message: Scalars['String']['output'];
  totalFound: Scalars['Int']['output'];
  totalLoaded: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type RegisterDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  email: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type ResendConfirmationDto = {
  email: Scalars['String']['input'];
};

export type ResetPasswordDto = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SubmitFeedbackInput = {
  content: Scalars['String']['input'];
  recipient: Scalars['String']['input'];
};

export type UpdateGameInput = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  metacritic?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  platforms?: InputMaybe<Array<Scalars['String']['input']>>;
  playtime?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  releasedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGenreInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlatformInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePreferenceInput = {
  bannedGameIds?: InputMaybe<Array<Scalars['String']['input']>>;
  chosenGameIds?: InputMaybe<Array<Scalars['String']['input']>>;
  completedGameIds?: InputMaybe<Array<Scalars['String']['input']>>;
  favoriteGameIds?: InputMaybe<Array<Scalars['String']['input']>>;
  platforms?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<UpdatePreferenceInput>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEmailConfirmed: Scalars['Boolean']['output'];
  preferences: Preferences;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type RegisterMutationVariables = Exact<{
  input: RegisterDto;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: { __typename?: 'RegisterResponse'; email: string; message: string };
};

export type ConfirmEmailMutationVariables = Exact<{
  input: ConfirmEmailDto;
}>;

export type ConfirmEmailMutation = {
  __typename?: 'Mutation';
  confirmEmail: { __typename?: 'MessageResponse'; message: string };
};

export type LoginMutationVariables = Exact<{
  input: LoginDto;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthResponse';
    accessToken: string;
    user: {
      __typename?: 'User';
      id: string;
      username: string;
      email: string;
      avatarUrl?: string | null;
      isEmailConfirmed: boolean;
      createdAt: any;
      updatedAt: any;
      preferences: {
        __typename?: 'Preferences';
        platforms: Array<string>;
        favoriteGames: Array<{
          __typename?: 'Game';
          id: string;
          name: string;
          slug: string;
          description: string;
          playtime: number;
          rating: number;
          metacritic?: number | null;
          coverUrl?: string | null;
          genres: Array<string>;
          platforms: Array<string>;
          releasedAt: any;
          createdAt: any;
          updatedAt: any;
        }>;
        completedGames: Array<{
          __typename?: 'Game';
          id: string;
          name: string;
          slug: string;
          description: string;
          playtime: number;
          rating: number;
          metacritic?: number | null;
          coverUrl?: string | null;
          genres: Array<string>;
          platforms: Array<string>;
          releasedAt: any;
          createdAt: any;
          updatedAt: any;
        }>;
        chosenGames: Array<{
          __typename?: 'Game';
          id: string;
          name: string;
          slug: string;
          description: string;
          playtime: number;
          rating: number;
          metacritic?: number | null;
          coverUrl?: string | null;
          genres: Array<string>;
          platforms: Array<string>;
          releasedAt: any;
          createdAt: any;
          updatedAt: any;
        }>;
        bannedGames: Array<{
          __typename?: 'Game';
          id: string;
          name: string;
          slug: string;
          description: string;
          playtime: number;
          rating: number;
          metacritic?: number | null;
          coverUrl?: string | null;
          genres: Array<string>;
          platforms: Array<string>;
          releasedAt: any;
          createdAt: any;
          updatedAt: any;
        }>;
      };
    };
  };
};

export type ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileQuery = {
  __typename?: 'Query';
  profile: {
    __typename?: 'User';
    id: string;
    username: string;
    email: string;
    avatarUrl?: string | null;
    isEmailConfirmed: boolean;
    createdAt: any;
    updatedAt: any;
    preferences: {
      __typename?: 'Preferences';
      platforms: Array<string>;
      favoriteGames: Array<{
        __typename?: 'Game';
        id: string;
        name: string;
        slug: string;
        description: string;
        playtime: number;
        rating: number;
        metacritic?: number | null;
        coverUrl?: string | null;
        genres: Array<string>;
        platforms: Array<string>;
        releasedAt: any;
        createdAt: any;
        updatedAt: any;
      }>;
      completedGames: Array<{
        __typename?: 'Game';
        id: string;
        name: string;
        slug: string;
        description: string;
        playtime: number;
        rating: number;
        metacritic?: number | null;
        coverUrl?: string | null;
        genres: Array<string>;
        platforms: Array<string>;
        releasedAt: any;
        createdAt: any;
        updatedAt: any;
      }>;
      chosenGames: Array<{
        __typename?: 'Game';
        id: string;
        name: string;
        slug: string;
        description: string;
        playtime: number;
        rating: number;
        metacritic?: number | null;
        coverUrl?: string | null;
        genres: Array<string>;
        platforms: Array<string>;
        releasedAt: any;
        createdAt: any;
        updatedAt: any;
      }>;
      bannedGames: Array<{
        __typename?: 'Game';
        id: string;
        name: string;
        slug: string;
        description: string;
        playtime: number;
        rating: number;
        metacritic?: number | null;
        coverUrl?: string | null;
        genres: Array<string>;
        platforms: Array<string>;
        releasedAt: any;
        createdAt: any;
        updatedAt: any;
      }>;
    };
  };
};

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateProfileMutation = {
  __typename?: 'Mutation';
  updateProfile: {
    __typename?: 'User';
    id: string;
    username: string;
    email: string;
    avatarUrl?: string | null;
    isEmailConfirmed: boolean;
    createdAt: any;
    updatedAt: any;
    preferences: {
      __typename?: 'Preferences';
      platforms: Array<string>;
      completedGames: Array<{
        __typename?: 'Game';
        id: string;
        name: string;
        slug: string;
        description: string;
        playtime: number;
        rating: number;
        metacritic?: number | null;
        coverUrl?: string | null;
        genres: Array<string>;
        platforms: Array<string>;
        releasedAt: any;
        createdAt: any;
        updatedAt: any;
      }>;
      chosenGames: Array<{
        __typename?: 'Game';
        id: string;
        name: string;
        slug: string;
        description: string;
        playtime: number;
        rating: number;
        metacritic?: number | null;
        coverUrl?: string | null;
        genres: Array<string>;
        platforms: Array<string>;
        releasedAt: any;
        createdAt: any;
        updatedAt: any;
      }>;
      bannedGames: Array<{
        __typename?: 'Game';
        id: string;
        name: string;
        slug: string;
        description: string;
        playtime: number;
        rating: number;
        metacritic?: number | null;
        coverUrl?: string | null;
        genres: Array<string>;
        platforms: Array<string>;
        releasedAt: any;
        createdAt: any;
        updatedAt: any;
      }>;
      favoriteGames: Array<{
        __typename?: 'Game';
        id: string;
        name: string;
        slug: string;
        description: string;
        playtime: number;
        rating: number;
        metacritic?: number | null;
        coverUrl?: string | null;
        genres: Array<string>;
        platforms: Array<string>;
        releasedAt: any;
        createdAt: any;
        updatedAt: any;
      }>;
    };
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordDto;
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: { __typename?: 'MessageResponse'; message: string };
};

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordDto;
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword: { __typename?: 'MessageResponse'; message: string };
};

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword: { __typename?: 'MessageResponse'; message: string };
};

export type DeleteProfileMutationVariables = Exact<{ [key: string]: never }>;

export type DeleteProfileMutation = {
  __typename?: 'Mutation';
  deleteProfile: { __typename?: 'MessageResponse'; message: string };
};

export type SubmitFeedbackMutationVariables = Exact<{
  input: SubmitFeedbackInput;
}>;

export type SubmitFeedbackMutation = {
  __typename?: 'Mutation';
  submitFeedback: string;
};

export type AdviceGameMutationVariables = Exact<{
  prompt: Scalars['String']['input'];
  ai?: InputMaybe<AiValue>;
  skippedGames?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
}>;

export type AdviceGameMutation = {
  __typename?: 'Mutation';
  adviceGame: {
    __typename?: 'Game';
    id: string;
    name: string;
    slug: string;
    description: string;
    playtime: number;
    rating: number;
    metacritic?: number | null;
    coverUrl?: string | null;
    genres: Array<string>;
    platforms: Array<string>;
    releasedAt: any;
    createdAt: any;
    updatedAt: any;
  };
};

export type GamesQueryVariables = Exact<{
  orderBy?: InputMaybe<RawgOrderingValue>;
  orderDirection?: InputMaybe<RawgOrderingDirection>;
  filter?: InputMaybe<GameFilterInput>;
}>;

export type GamesQuery = {
  __typename?: 'Query';
  games: Array<{
    __typename?: 'Game';
    id: string;
    name: string;
    slug: string;
    description: string;
    playtime: number;
    rating: number;
    metacritic?: number | null;
    coverUrl?: string | null;
    genres: Array<string>;
    platforms: Array<string>;
    releasedAt: any;
    createdAt: any;
    updatedAt: any;
  }>;
};

export type GameQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type GameQuery = {
  __typename?: 'Query';
  game: {
    __typename?: 'Game';
    id: string;
    name: string;
    slug: string;
    description: string;
    playtime: number;
    rating: number;
    metacritic?: number | null;
    coverUrl?: string | null;
    genres: Array<string>;
    platforms: Array<string>;
    releasedAt: any;
    createdAt: any;
    updatedAt: any;
  };
};

export type GenresQueryVariables = Exact<{ [key: string]: never }>;

export type GenresQuery = {
  __typename?: 'Query';
  genres: Array<{
    __typename?: 'Genre';
    id: string;
    name: string;
    createdAt: any;
    updatedAt: any;
  }>;
};

export type PlatformsQueryVariables = Exact<{ [key: string]: never }>;

export type PlatformsQuery = {
  __typename?: 'Query';
  platforms: Array<{
    __typename?: 'Platform';
    id: string;
    name: string;
    createdAt: any;
    updatedAt: any;
  }>;
};

export type ResendConfirmationMutationVariables = Exact<{
  input: ResendConfirmationDto;
}>;

export type ResendConfirmationMutation = {
  __typename?: 'Mutation';
  resendConfirmation: { __typename?: 'MessageResponse'; message: string };
};

export const namedOperations = {
  Query: {
    Profile: 'Profile',
    Games: 'Games',
    Game: 'Game',
    Genres: 'Genres',
    Platforms: 'Platforms',
  },
  Mutation: {
    Register: 'Register',
    ConfirmEmail: 'ConfirmEmail',
    Login: 'Login',
    UpdateProfile: 'UpdateProfile',
    ForgotPassword: 'ForgotPassword',
    ResetPassword: 'ResetPassword',
    ChangePassword: 'ChangePassword',
    DeleteProfile: 'DeleteProfile',
    SubmitFeedback: 'SubmitFeedback',
    AdviceGame: 'AdviceGame',
    ResendConfirmation: 'ResendConfirmation',
  },
};

export const RegisterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Register' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterDto' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ConfirmEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ConfirmEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ConfirmEmailDto' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'confirmEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfirmEmailMutation,
  ConfirmEmailMutationVariables
>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LoginDto' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatarUrl' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isEmailConfirmed' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'preferences' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'platforms' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'favoriteGames' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'slug' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'description',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'playtime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'rating' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'metacritic' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'coverUrl' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'genres' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'platforms' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'releasedAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'updatedAt' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'completedGames' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'slug' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'description',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'playtime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'rating' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'metacritic' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'coverUrl' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'genres' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'platforms' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'releasedAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'updatedAt' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'chosenGames' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'slug' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'description',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'playtime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'rating' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'metacritic' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'coverUrl' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'genres' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'platforms' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'releasedAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'updatedAt' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'bannedGames' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'slug' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'description',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'playtime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'rating' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'metacritic' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'coverUrl' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'genres' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'platforms' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'releasedAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'updatedAt' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Profile' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isEmailConfirmed' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'preferences' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'platforms' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'favoriteGames' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'playtime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rating' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'metacritic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'genres' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'platforms' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'releasedAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'completedGames' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'playtime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rating' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'metacritic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'genres' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'platforms' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'releasedAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'chosenGames' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'playtime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rating' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'metacritic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'genres' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'platforms' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'releasedAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bannedGames' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'playtime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rating' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'metacritic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'genres' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'platforms' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'releasedAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const UpdateProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProfile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isEmailConfirmed' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'preferences' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'platforms' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'completedGames' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'playtime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rating' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'metacritic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'genres' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'platforms' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'releasedAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'chosenGames' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'playtime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rating' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'metacritic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'genres' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'platforms' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'releasedAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bannedGames' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'playtime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rating' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'metacritic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'genres' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'platforms' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'releasedAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'favoriteGames' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'playtime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rating' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'metacritic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'genres' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'platforms' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'releasedAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const ForgotPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ForgotPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ForgotPasswordDto' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'forgotPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const ResetPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResetPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ResetPasswordDto' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resetPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const ChangePasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangePassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ChangePasswordInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changePassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const DeleteProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteProfile' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteProfile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteProfileMutation,
  DeleteProfileMutationVariables
>;
export const SubmitFeedbackDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SubmitFeedback' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SubmitFeedbackInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'submitFeedback' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubmitFeedbackMutation,
  SubmitFeedbackMutationVariables
>;
export const AdviceGameDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdviceGame' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'prompt' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ai' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AIValue' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'skippedGames' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'String' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adviceGame' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'prompt' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'prompt' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ai' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ai' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skippedGames' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skippedGames' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'playtime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rating' } },
                { kind: 'Field', name: { kind: 'Name', value: 'metacritic' } },
                { kind: 'Field', name: { kind: 'Name', value: 'coverUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'genres' } },
                { kind: 'Field', name: { kind: 'Name', value: 'platforms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releasedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdviceGameMutation, AdviceGameMutationVariables>;
export const GamesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Games' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'RawgOrderingValue' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderDirection' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'RawgOrderingDirection' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GameFilterInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'games' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderDirection' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderDirection' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filter' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'playtime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rating' } },
                { kind: 'Field', name: { kind: 'Name', value: 'metacritic' } },
                { kind: 'Field', name: { kind: 'Name', value: 'coverUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'genres' } },
                { kind: 'Field', name: { kind: 'Name', value: 'platforms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releasedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GamesQuery, GamesQueryVariables>;
export const GameDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Game' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'game' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'slug' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'playtime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rating' } },
                { kind: 'Field', name: { kind: 'Name', value: 'metacritic' } },
                { kind: 'Field', name: { kind: 'Name', value: 'coverUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'genres' } },
                { kind: 'Field', name: { kind: 'Name', value: 'platforms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releasedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GameQuery, GameQueryVariables>;
export const GenresDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Genres' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'genres' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GenresQuery, GenresQueryVariables>;
export const PlatformsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Platforms' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'platforms' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PlatformsQuery, PlatformsQueryVariables>;
export const ResendConfirmationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResendConfirmation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ResendConfirmationDto' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resendConfirmation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResendConfirmationMutation,
  ResendConfirmationMutationVariables
>;
