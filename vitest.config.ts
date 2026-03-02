import path from 'node:path';

import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts', 'test/**/*.test.tsx'],
    setupFiles: ['./test/setup.ts'],
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
