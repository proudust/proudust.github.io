module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'react-app'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  plugins: ['react'],
  ...(!process.env.CI && { processor: '@graphql-eslint/graphql' }),
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
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    ...(!process.env.CI
      ? [
          {
            files: ['*.graphql'],
            parser: '@graphql-eslint/eslint-plugin',
            plugins: ['@graphql-eslint'],
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
  ],
};
