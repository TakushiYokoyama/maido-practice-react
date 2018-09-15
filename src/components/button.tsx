import { Theme } from '../common/styles/theme';
import { decorate, getInjectClasses } from '../common/styles/styles-helper';
import * as React from 'react';
import { StylesBase, InjectableStyledProps } from '../common/styles/types';
import { createPropagationProps } from '../common/component-helper';

interface Styles extends StylesBase {}
const styles = (theme: Theme): Styles => ({
  root: { color: 'white', backgroundColor: 'blue' },
});
type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
interface ButtonProps extends InjectableStyledProps<Styles> {
  visible?: boolean;
}
export const Button = decorate(styles)<ButtonProps & BaseButtonProps>(props => {
  const { visible } = props;
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props, 'visible');
  return visible ? <button className={root} {...pProps} /> : <React.Fragment />;
});
Button.defaultProps = {
  visible: true,
};
