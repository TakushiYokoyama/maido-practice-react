import * as React from 'react';
import { ButtonProps } from './common';

export const Button1: React.SFC<ButtonProps> = props => (
  <button {...props} style={{ color: 'red' }} />
);
