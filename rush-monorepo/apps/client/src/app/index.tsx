import React, { ReactElement } from 'react';

import Foo from '~src/pages/foo/foo';

const App = (): ReactElement => {
  return <Foo id={Number(1234)} />;
};

export default App;
