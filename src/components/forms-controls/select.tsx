import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { BaseSelectProps, OptionProps } from '../types';
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
interface SelectProps extends InjectableStyledProps<Styles> {
  selectItems: OptionProps[];
}
export const Select = decorate(styles)<SelectProps & BaseSelectProps>(props => {
  const { selectItems } = props;
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props, 'selectItems');
  return (
    <select className={root} {...pProps}>
      {selectItems.map(x => (
        <option {...x} />
      ))}
    </select>
  );
});
Select.defaultProps = {};
