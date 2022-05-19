// import fs from 'fs';
import path from 'path';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
// import gzipSize from 'gzip-size';
// import * as brotliSize from 'brotli-size';
import pkg from './package.json';
import dts from 'rollup-plugin-dts';

const input = './src/index.tsx';

const external = id => {
  return id.startsWith('.') === false && path.isAbsolute(id) === false;
};

const extensions = [
  '.tsx', '.ts', '.js', '.jsx', '.es6', '.es', '.mjs'
];

const babelOptions = {
  babelHelpers: 'runtime',
  extensions,
  include: ['src/**/*'],
}

export default [
  {
    input,
    external,
    plugins: [
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),

      babel(babelOptions),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.OPENPIX_API': JSON.stringify('https://api.openpix.com.br'),
      }),

      terser(),
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'esm'
      },
    ]
  },
  {
    input,
    plugins: [
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),

      babel(babelOptions),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.OPENPIX_API': JSON.stringify('https://api.openpix.com.br'),
      }),

      terser(),
    ],
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'OpenPixReact',
      }
    ]
  },
  // to check esm production size
  {
    input,
    output: { file: 'dist/openpix-react.esm.production.js', format: 'esm' },
    external,
    plugins: [
      // Allows node_modules resolution
      resolve({ extensions }),
      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),
      babel(babelOptions),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.OPENPIX_API': JSON.stringify('https://api.openpix.com.br'),
      }),
      terser(),
      // {
      //   generateBundle(outputOptions, bundle) {
      //     let sizeInfo = '';
      //     for (const [name, chunk] of Object.entries(bundle)) {
      //       const parsedSize = chunk.code.length;
      //       const gzippedSize = gzipSize.sync(chunk.code);
      //       const brotliedSize = brotliSize.sync(chunk.code);
      //       sizeInfo += `Size of ${name}
      //       =============================
      //       min: ${parsedSize} b
      //       gzip: ${gzippedSize} b
      //       brotli: ${brotliedSize} b\n`.replace(/^\s+/gm, '');
      //     }
      //     console.info(sizeInfo);
      //     fs.writeFileSync('size-snapshot.txt', sizeInfo, 'utf-8');
      //   },
      // },
    ],
  },
  {
    input: 'types/index.d.ts',
    output: [{ file: pkg.types, format: 'esm' }],
    plugins: [dts()],
  },
];
