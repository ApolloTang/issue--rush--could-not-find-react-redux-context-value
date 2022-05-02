const path = require('path');
const isTest = String(process.env.NODE_ENV) === 'test';
const isProd = String(process.env.NODE_ENV) === 'production';
const isAnalyze = String(process.env.NODE_ENV) === 'analyze';

module.exports = api => {
  api.cache(true);

  if (!isAnalyze && !isTest) {
    console.info(
      '[Babel] using babel.config.js in apps/client; NODE_ENV: ',
      process.env.NODE_ENV
    );
  }

  const presets = [
    [
      '@babel/preset-env',
      {
        debug: false,
        useBuiltIns: 'usage',
        corejs: '3.6',
        modules: isTest ? 'commonjs' : false,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ];

  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-syntax-dynamic-import',
    isTest ? 'babel-plugin-dynamic-import-node' : null,
    'lodash',
    [
      'module-resolver',
      {
        alias: {
          // https://github.com/reduxjs/react-redux/issues/1631
          // https://github.com/microsoft/redux-dynamic-modules/issues/144
          'react-redux': path.resolve(
            __dirname,
            'node_modules/react-redux/lib'
          ),
        },
      },
    ],
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};
