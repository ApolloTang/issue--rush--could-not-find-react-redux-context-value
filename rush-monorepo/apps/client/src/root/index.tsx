import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../app/';
import { store } from './store';

// react root
const Root = () => (
  <div className="root">
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </div>
);

export default Root;
