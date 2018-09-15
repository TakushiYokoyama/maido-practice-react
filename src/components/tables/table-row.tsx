import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: (props: TableRowProps) => {
    const array: Array<{}> = [
      {
        width: '100%',
        borderCollapse: 'collapse',
        display: 'table-row',
        '&:nth-child(odd)': {
          backgroundColor: '#f6f6f6',
        },
      },
    ];
    if (props.selectable) {
      array.push({
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      });
    }
    if (props.selected) {
      array.push({
        backgroundColor: '#ddd',
      });
    }
    return Object.assign({}, ...array);
  },
};
interface TableRowProps extends InjectableStyledProps<Styles> {
  selectable?: boolean;
  selected?: boolean;
}
export const TableRow = decorate(styles)<TableRowProps & DivProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props, 'selectable', 'selected');
  return <div className={root} {...pProps} />;
});
TableRow.defaultProps = { selectable: false, selected: false };
