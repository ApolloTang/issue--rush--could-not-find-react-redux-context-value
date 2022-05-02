import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { renderWithStore } from '~src/util/test-utils/renderer';
import Foo from './foo';

describe('Foo Page', () => {
  it('renders', async () => {
    const Id = 1234;
    renderWithStore(<Foo id={Id} />);
    await waitFor(() => {
      expect(screen.getByTestId(`${Id}`)).toBeVisible();
    });
  });
});
