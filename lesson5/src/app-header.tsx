import * as React from 'react';

interface Props {
  authenticated: boolean;
  onLogout: () => void;
}
export const AppHeader: React.SFC<Props> = ({ authenticated, onLogout }) => {
  return (
    <div className="header">
      <div className="left">
        <a href="/">Application</a>
      </div>
      <div className="right">
        {authenticated && (
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
