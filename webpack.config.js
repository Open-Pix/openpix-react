const path = require('path');

// const dotEnv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");

const cwd = process.cwd();
const outputPath = path.join(cwd, 'lib');

const common = {
  mode: 'production',
  context: path.resolve(cwd, './'),
  entry: ['./src/index.tsx'],
  output: {
    path: outputPath,
    publicPath: '/',
    pathinfo: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: [/node_modules/],
        use: ['babel-loader?cacheDirectory'],
      },
    ],
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimizer: [new TerserPlugin({
      parallel: 4,
    })],
  },
};

const configEnv = ({ name, filename, libraryTarget }) => {
  return merge(common, {
    name,
    output: {
      filename,
      libraryTarget,
    },
  });
};

module.exports = [
  configEnv({
    name: 'csj',
    libraryTarget: 'commonjs',
    filename: 'openpix-react.cjs.js',
  }),
  configEnv({
    name: 'esm',
    libraryTarget: 'module',
    filename: 'openpix-react.esm.js',
  }),
  // terser is throwing errors
  // configEnv({
  //   name: 'umd',
  //   libraryTarget: 'umd',
  //   filename: 'openpix-react.umd.js',
  // }),
];
