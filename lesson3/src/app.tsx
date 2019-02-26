import * as React from 'react';
import { AppHeader } from './app-header';
import { AppBody } from './app-body';
import { BrowserRouter } from 'react-router-dom';

const App: React.SFC = props => (
  <div>
    <AppHeader />
    <AppBody />
  </div>
);

export default App;
