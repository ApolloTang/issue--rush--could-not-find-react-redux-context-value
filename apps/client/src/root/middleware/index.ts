import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = [thunk];

middleware.push(
  // @ts-ignore
  createLogger() // <---- createLogger give weird typscript errors
  // https://github.com/LogRocket/redux-logger/issues/333
);

export { middleware };
