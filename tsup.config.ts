import {defineConfig} from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    block: 'src/block.ts',
    'jsx-runtime': 'src/jsx-runtime.ts',
    'jsx-dev-runtime': 'src/jsx-dev-runtime.ts',
  },
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  platform: 'node',
  target: 'es2019',
  outExtension({format}) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
