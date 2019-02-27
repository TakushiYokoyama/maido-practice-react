import * as React from 'react';
import { ButtonProps } from './common';
import styles from './button4.module.scss';

const { button4 } = styles;
export const Button41: React.SFC<ButtonProps> = props => (
  <button {...props} className={button4} />
);
export const Button42: React.SFC<ButtonProps> = props => (
  <button {...props} className={button4} />
);
export const Button43: React.SFC<ButtonProps> = props => (
  <button {...props} className="button4" />
);
