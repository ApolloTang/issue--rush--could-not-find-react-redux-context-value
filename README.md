# Error when running jest

<img src="./documents/error-when-running-test.png" />


---



To reproduce the error comment out the the key:

```plugins --> module-resolver --> alias --> react-redux'  ```

in   `rush-monorepo/apps/client/babel.config.js`: 

```  const plugins = [
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
          // 'react-redux': path.resolve(
          //   __dirname,
          //   'node_modules/react-redux/lib'
          // ),
        },
      },
    ],
  ].filter(Boolean);
```



### Related Reference: 

https://github.com/reduxjs/react-redux/issues/1631 

https://github.com/microsoft/redux-dynamic-modules/issues/144 





