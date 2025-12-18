# Game Advisor Network Library

A TypeScript library that provides GraphQL client functionality for the Game Advisor application using Apollo Client.

## Overview

This library serves as the network layer for the Game Advisor application, providing:

- Apollo Client setup with React integration
- Type-safe GraphQL operations using GraphQL Code Generator
- Authentication and user management operations
- Game data fetching and AI-powered recommendations
- User profile and preferences management

## Installation

```bash
npm install game-advisor_network
```

## Usage

### Basic Setup

Wrap your React application with the ApolloProvider:

```tsx
import { ApolloProvider } from 'game-advisor_network';

const App = () => {
  return <ApolloProvider>{/* Your app components */}</ApolloProvider>;
};
```

### Using GraphQL Operations

The library exports generated hooks and types for all GraphQL operations:

```tsx
import { AdviceGameDocument } from 'game-advisor_network';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';

const LoginComponent = () => {
  const [adviceGame] = useMutation(AdviceGameDocument);
  const [prompt, setPrompt] = useState();

  const handleAdvice = () => {
    adviceGame({
      variables: { prompt },
    });
  };
};
```

## Environment Variables

Set the following environment variable to configure the GraphQL API endpoint:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Development

### Code Generation

GraphQL types and hooks are generated automatically. To regenerate after schema changes:

```bash
npm run codegen
```

This will update the generated files in `gql/generated.tsx` based on:

- GraphQL schema from `apps/api/src/schema.gql`
- Operation definitions from `gql/queries.gql`

### Building

```bash
npm run build
```

The built files will be available in the `dist/` directory.

## Architecture

- **ApolloProvider**: React component that sets up Apollo Client with HTTP link and in-memory cache
- **GraphQL Operations**: Type-safe queries and mutations defined in `gql/queries.gql`
