import * as React from 'react';

const Login: React.SFC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <form className="login-form" onSubmit={onLogin}>
      <div>
        <label htmlFor="email">Eメール</label>
        <input id="email" />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input id="password" type="password" />
      </div>
      <div>
        <button type="submit" className="btn">
          ログイン
        </button>
      </div>
    </form>
  );
};
const AuthenticatedBody: React.SFC = props => {
  return <React.Fragment>authenticated</React.Fragment>;
};
interface Props {
  authenticated: boolean;
  onLogin: () => void;
}
export const AppBody: React.SFC<Props> = ({ authenticated, onLogin }) => (
  <div className="body">
    {authenticated ? <AuthenticatedBody /> : <Login onLogin={onLogin} />}
  </div>
);
