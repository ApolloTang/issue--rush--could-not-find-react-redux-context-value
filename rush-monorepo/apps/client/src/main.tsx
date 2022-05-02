if (!Object.assign) {
  void import('core-js/features/object/assign');
}
import React from 'react';
import ReactDom from 'react-dom';

import Root from './root';

const appContainer = document.getElementById('app-container');
ReactDom.render(<Root />, appContainer);
