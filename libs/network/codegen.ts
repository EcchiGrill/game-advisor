import type { CodegenConfig } from '@graphql-codegen/cli';

const documentsPattern = '**/*.gql';

const plugins = [
  'typescript',
  'typescript-operations',
  'named-operations-object',
  'typed-document-node',
];

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../../../apps/api/src/schema.gql',
  generates: {
    './gql/generated.tsx': {
      documents: `${documentsPattern}`,
      plugins,
    },
  },
};

export default config;
