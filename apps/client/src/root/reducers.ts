import { combineReducers } from 'redux';

import { reducer as fooReducer } from '~src/pages/foo/slice';

const rootReducer = combineReducers({
  foo: fooReducer,
});

export { rootReducer };
