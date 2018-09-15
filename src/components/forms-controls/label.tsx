import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { BaseLabelProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: {
    padding: [0, 20],
    width: '100%',
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },
};
interface LabelProps extends InjectableStyledProps<Styles> {}
export const Label = decorate(styles)<LabelProps & BaseLabelProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props);
  return <label className={root} {...pProps} />;
});
Label.defaultProps = {};
