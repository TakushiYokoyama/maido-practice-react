import * as React from 'react';
import { ButtonProps } from './common';
import './button3.scss';

export const Button3: React.SFC<ButtonProps> = props => (
  <button {...props} className="button3" />
);
