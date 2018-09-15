import * as React from 'react';
import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { Theme } from '../../common/styles/theme';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { createPropagationProps } from '../../common/component-helper';
import { DivProps } from '../types';

interface Styles extends StylesBase {}
const styles = (theme: Theme): Styles => ({
  root: {
    color: theme.color.gray.middle,
    padding: [10, 20],
    border: [theme.borderWidth.thick, 'solid', theme.borderColor.gray.middle],
    borderRadius: 15,
  },
});
interface FormProps extends InjectableStyledProps<Styles> {}
export const Form = decorate(styles)<FormProps & DivProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props);
  return <div className={root} {...pProps} />;
});
Form.defaultProps = {};
