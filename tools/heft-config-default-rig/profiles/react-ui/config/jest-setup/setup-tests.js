// This file will run on each test, after jest is loaded

console.log('==== Msg from jest-setup/setup-test.js')
require('@testing-library/jest-dom/extend-expect');

// https://github.com/nickcolley/jest-axe/issues/79#issuecomment-883557070
const toHaveNoViolations = require('jest-axe').toHaveNoViolations;
expect.extend(toHaveNoViolations);

