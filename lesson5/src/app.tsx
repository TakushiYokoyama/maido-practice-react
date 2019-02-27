import * as React from 'react';
import { AppHeader } from './app-header';
import { AppBody } from './app-body';

const App: React.SFC = props => {
  const [authenticated, setAuthenticated] = React.useState(false);
  return (
    <div>
      <AppHeader
        authenticated={authenticated}
        onLogout={() => setAuthenticated(false)}
      />
      <AppBody
        authenticated={authenticated}
        onLogin={() => setAuthenticated(true)}
      />
    </div>
  );
};

export default App;
