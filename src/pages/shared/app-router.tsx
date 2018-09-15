import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { HomeIndex } from '../home';
import { HomeHelp } from '../home/help';

export namespace Url {
  export const root = '/';
  export const help = '/help';
}
export const AppRouter: React.SFC = () => {
  return (
    <Switch>
      <Route exact={true} path={Url.root} component={HomeIndex} />
      <Route exact={true} path={Url.help} component={HomeHelp} />
      <Redirect to={Url.root} />
    </Switch>
  );
};
