import * as React from 'react';
import { ButtonProps } from './common';
import './button2.css';

export const Button2: React.SFC<ButtonProps> = props => (
  <button {...props} className="button2" />
);
