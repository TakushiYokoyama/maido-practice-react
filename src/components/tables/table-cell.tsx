import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: (props: TableCellProps) => {
    const array: Array<{}> = [
      {
        padding: 5,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#ccc',
        display: 'table-cell',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    ];
    if (props.isHeader) {
      array.push({
        backgroundColor: '#333',
        color: '#fff',
        fontWeight: 'bold',
      });
    }
    return Object.assign({}, ...array);
  },
};
interface TableCellProps extends InjectableStyledProps<Styles> {
  isHeader?: boolean;
}
export const TableCell = decorate(styles)<TableCellProps & DivProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props, 'isHeader');
  return <div className={root} {...pProps} />;
});
TableCell.defaultProps = { isHeader: false };
