import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { InputProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: {
    border: [2, 'solid', '#888'],
    borderRadius: 5,
    padding: 5,
    fontWeight: 'bold',
    color: '#555',
    outline: 'none',
    width: '100%',
  },
};
interface TextBoxProps extends InjectableStyledProps<Styles> {}
export const TextBox = decorate(styles)<TextBoxProps & InputProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props);
  return <input className={root} {...pProps} />;
});
TextBox.defaultProps = { type: 'text' };
