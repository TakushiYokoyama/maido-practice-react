import * as React from 'react';

export const AppHeader: React.FunctionComponent = props => {
  const handleClick = () => (window.location.href = '/contact');
  return (
    <div className="header">
      <div className="left">
        <a href="/">Application</a>
      </div>
      <div className="right">
        <a className="btn" href="/about">
          About
        </a>
        <button className="btn" onClick={handleClick}>
          Contact
        </button>
      </div>
    </div>
  );
};
