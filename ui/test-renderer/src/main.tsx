import React from 'react';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const testRenderer =
  (rootReducer, initialState) =>
  (ui: React.ReactNode): RenderResult => {
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    );
    return render(<Provider store={store}>{ui}</Provider>);
  };

export { testRenderer };
