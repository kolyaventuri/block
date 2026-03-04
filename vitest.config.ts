import path from 'node:path';

import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts', 'test/**/*.test.tsx'],
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['src/jsx-runtime.ts', 'src/jsx-dev-runtime.ts', 'src/jsx.d.ts'],
      reporter: ['text', 'lcov'],
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85,
      },
    },
  },
  resolve: {
    alias: {
      'jsx-runtime/jsx-runtime': path.resolve('./src/jsx-runtime.ts'),
      'jsx-runtime/jsx-dev-runtime': path.resolve('./src/jsx-dev-runtime.ts'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'jsx-runtime',
  },
});
