import { Theme } from '../../common/styles/theme';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import * as React from 'react';
import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { createPropagationProps } from '../../common/component-helper';
import { BaseButtonProps } from '../types';

interface Styles extends StylesBase {}
const styles = (theme: Theme): Styles => ({
  root: {
    backgroundColor: theme.backgroundColor.gray.dark,
    boxShadow: theme.boxShadow.middle,
    color: theme.color.white.bright,
    width: '100%',
    position: 'relative',
    border: 'none',
    height: 30,
    outline: 'none',
    fontWeight: theme.fontWeight.bold,
    borderRadius: 4,
    '&[disabled]': {
      backgroundColor: theme.backgroundColor.gray.bright,
      boxShadow: theme.boxShadow.none,
    },
    '&:active': {
      top: 1,
      left: 1,
      boxShadow: theme.boxShadow.none,
    },
  },
});
interface ButtonProps extends InjectableStyledProps<Styles> {}
export const Button = decorate(styles)<ButtonProps & BaseButtonProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props);
  return <button className={root} {...pProps} />;
});
Button.defaultProps = { disabled: false };
