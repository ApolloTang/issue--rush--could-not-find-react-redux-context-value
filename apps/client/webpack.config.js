const path = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const chalk = require('chalk');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

// -- plugins -- //
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// -- Configuration Setting -- //
const webpackDevServer_host = 'localhost';
const webpackDevServer_port = '3001';
const absPathToSrc = path.resolve(__dirname, 'src');
const absPathToDist = path.resolve(__dirname, 'dist');
const absPathToFont = path.resolve(__dirname, 'src/common/fonts');

const webpackConfig_fn = (env = {}) => {
  const mode = env.mode || 'production';
  const { ifProduction } = getIfUtils(mode);

  const configOut = {
    devServer: ifProduction(
      {},
      {
        host: webpackDevServer_host,
        port: webpackDevServer_port,
        historyApiFallback: true,
        stats: 'minimal',
      }
    ),
    devtool: ifProduction(false, 'source-map'), // TODO enable source-map on in QA environment
    mode,
    context: absPathToSrc,
    entry: {
      main: ['./main'],
    },
    output: ifProduction(
      {
        publicPath: '/',
        filename: '[name]-[chunkhash].js',
        path: absPathToDist,
      },
      {
        publicPath: '/',
      }
    ),
    resolve: {
      alias: {
        '~src': path.resolve(__dirname, 'src')
      },
      modules: [absPathToSrc, 'node_modules'],
      extensions: ['*', '.mjs', '.js', '.ts', '.jsx', '.tsx'],
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?(j|t)sx?$/,
          use: 'babel-loader',
          exclude: /node_modules/, // exclude node_modules to avoid transpiling all node_modules
        },
        {
          test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
          loader: 'file-loader?name=./imgs/[name].[hash].[ext]',
          exclude: absPathToFont,
        },
        {
          test: /\.(woff|woff2|ttf|eot|otf)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
          loader: 'file-loader?name=fonts/[name].[ext]',
        },
        { test: /\.(html)$/, use: 'raw-loader' },
      ]),
    },
    plugins: removeEmpty([
      new ProgressBarPlugin({
        format:
          '  build [:bar] ' +
          chalk.green.bold(':percent') +
          ' (:elapsed seconds)',
        clear: false,
      }),
      new HtmlWebpackPlugin({
        template: ifProduction('index.prod.html', 'index.dev.ejs'),
        filename: path.join(
          absPathToDist,
          ifProduction('index.ejs', 'index.html')
        ),
      }),
      new webpack.DefinePlugin({
        'process.env.BUILD_VERSION': 'null', // JSON.stringify(BUILD_VERSION),
        'process.env.BUILD_DATE': 'null', //JSON.stringify(BUILD_DATE),
      }),
      new Dotenv({
        path: './.env',
        expand: true, // Allow referencing other env vars within .env (syntax: $<VAR_NAME>)
        safe: false, // set to true suppose to load .env.example, but does not work.
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        defaults: false, // load '.env.defaults' as the default values if empty.
      }),
    ]),
  };

  return configOut;
};

module.exports = webpackConfig_fn;
