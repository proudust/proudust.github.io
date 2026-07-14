import graphqlPlugin from '@graphql-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['.cache/', 'public/', 'src/gatsby-types.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    plugins: {
      import: importPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
    },
    ...(!process.env.CI && { processor: graphqlPlugin.processor }),
  },
  ...(!process.env.CI
    ? [
        {
          files: ['**/*.graphql'],
          plugins: {
            '@graphql-eslint': graphqlPlugin,
          },
          languageOptions: {
            parser: graphqlPlugin.parser,
          },
          rules: {
            '@graphql-eslint/no-anonymous-operations': 'error',
            '@graphql-eslint/naming-convention': [
              'error',
              {
                OperationDefinition: {
                  style: 'PascalCase',
                  forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
                  forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
                },
              },
            ],
          },
        },
      ]
    : []),
);
