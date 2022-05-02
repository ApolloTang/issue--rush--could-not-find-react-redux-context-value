import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { ENABLE_REDUX_LOGGER } from '../../config';

const middleware = [thunk];

if (ENABLE_REDUX_LOGGER) {
  middleware.push(
    // @ts-ignore
    createLogger() // <---- createLogger give weird typscript errors
    // https://github.com/LogRocket/redux-logger/issues/333
  );
}

export { middleware };
