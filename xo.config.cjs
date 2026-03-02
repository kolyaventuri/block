/** @type {import('xo').FlatXoConfig} */
module.exports = [
  {
    ignores: ['**/*.js', '**/*.cjs', '**/*.mjs']
  },
  {
    space: true,
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
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
    },
    settings: {
      'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.cjs', '.mjs'],
      'import-x/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.cjs', '.mjs', '.json']
        }
      }
    }
  }
];
