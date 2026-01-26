import {defineConfig} from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    block: 'src/block.ts',
  },
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  platform: 'node',
  target: 'es2019',
  external: ['react'],
  outExtension({format}) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
