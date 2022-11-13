const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = [
  {
    target: "node",
    entry: [
      path.join(__dirname, './src/main.js'),
    ],
    output: {
      filename: 'main.min.js',
      path: path.join(__dirname, '/build'),
      libraryTarget: 'commonjs2', // Fixes hot loading of web worker not working in Webpack
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        }
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new NodePolyfillPlugin({
        includeAliases: ['Buffer'], // Buffer global is still needed due to the jsonparser library
      }),
    ],
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, 'node_modules')],
    },
  },
];