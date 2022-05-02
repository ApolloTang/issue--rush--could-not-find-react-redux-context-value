import React from 'react';
import { RenderResult } from '@testing-library/react';

import { testRenderer } from '@myscope/ui--test-renderer';

import { rootReducer } from '~src/root/reducers';
import { store } from '~src/root/store';

const initialState = store.getState();

export const renderWithStore = (ui: React.ReactNode): RenderResult =>
  testRenderer(rootReducer, initialState)(ui);
