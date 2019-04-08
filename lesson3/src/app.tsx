import * as React from 'react';
import { AppHeader } from './app-header';
import { AppBody } from './app-body';

const App: React.FunctionComponent = props => (
  <div>
    <AppHeader />
    <AppBody />
  </div>
);

export default App;
