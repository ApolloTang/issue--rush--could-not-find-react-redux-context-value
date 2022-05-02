// =====================================================
// This file will run on each test, after jest is loaded
// =====================================================
// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import React from 'react';
import mediaQuery from 'css-mediaquery';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}

beforeAll(() => {
  window.matchMedia = createMatchMedia(window.innerWidth);
});
