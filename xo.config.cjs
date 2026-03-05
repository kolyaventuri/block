/** @type {import('xo').FlatXoConfig} */

const sharedRules = {
  // @typescript-eslint cannot resolve JSX.Element through our custom JSX runtime path alias
  // (jsxImportSource: "jsx-runtime" mapped via tsconfig paths). This causes every variable
  // typed as Element/Child/BElement to appear "error typed", cascading into hundreds of
  // false-positive no-unsafe-* violations across all transformer files. tsc already enforces
  // type safety here, so these rules are disabled for the linter only.
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@stylistic/jsx-quotes': ['error', 'prefer-double'],
  'import-x/no-cycle': 'error',
  'import-x/order': [
    'error',
    {
      groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      warnOnUnassignedImports: true,
      distinctGroup: true,
      sortTypesGroup: false,
      named: false
    }
  ],
  'import-x/extensions': [
    'error',
    'ignorePackages',
    {
      ts: 'never',
      tsx: 'never'
    }
  ],
  'unicorn/prevent-abbreviations': [
    'error',
    {
      checkFilenames: false,
      checkDefaultAndNamespaceImports: false,
      checkShorthandImports: false,
      extendDefaultReplacements: true,
      replacements: {
        elem: false,
        props: false,
        res: false
      }
    }
  ],
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'memberLike',
      modifiers: ['private'],
      format: ['camelCase'],
      leadingUnderscore: 'requireDouble'
    },
    {
      selector: 'memberLike',
      modifiers: ['protected'],
      format: ['camelCase'],
      leadingUnderscore: 'require'
    }
  ]
};

const sharedSettings = {
  'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.cjs', '.mjs'],
  'import-x/resolver': {
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.cjs', '.mjs', '.json']
    }
  }
};

module.exports = [
  {
    ignores: ['**/*.js', '**/*.cjs', '**/*.mjs', 'tsup.config.ts', 'vitest.config.ts', 'examples/**']
  },
  {
    space: true,
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: sharedRules,
    settings: sharedSettings,
  },
  {
    space: true,
    files: ['test/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: './test/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: sharedRules,
    settings: sharedSettings,
  }
];
