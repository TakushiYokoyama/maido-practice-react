import * as React from 'react';
import { DispatchMapper, StateMapper } from '../../stores/types';
import { connect } from 'react-redux';
import { decorate } from '../../common/styles/styles-helper';
import { StylesBase } from '../../common/styles/types';
import Friend from '../../models/friend';
import { getSexName } from '../../services/friend-service';
import { Table } from '../../components/tables/table';
import { TableRow } from '../../components/tables/table-row';
import { TableCell } from '../../components/tables/table-cell';
import { Row } from '../../components/forms-controls/row';
import { Cell } from '../../components/forms-controls/cell';
import { Button } from '../../components/forms-controls/button';

interface Styles extends StylesBase {}
const styles = (): Styles => ({
  root: {},
});
interface Events {}
interface Props {
  friends: Friend[];
}
const mapDispatchToProps: DispatchMapper<Events> = () => {
  return {};
};
const mapStateToProps: StateMapper<Props> = ({ barListState }) => {
  return {
    friends: barListState.friends,
  };
};
const decoratedComponent = decorate(styles)<Props & Events>(props => {
  const { friends } = props;
  return (
    <div className="list">
      <Row>
        <h3>めいぼ</h3>
      </Row>
      <Row>
        <Cell size={2}>
          <Button>なかまをくわえる</Button>
        </Cell>
      </Row>
      <Row>
        <Table>
          <TableRow>
            <TableCell isHeader={true}>なまえ</TableCell>
            <TableCell isHeader={true}>しょくぎょう</TableCell>
            <TableCell isHeader={true}>せいべつ</TableCell>
            <TableCell isHeader={true}>せいかく</TableCell>
          </TableRow>
          {friends.map(f => (
            <TableRow key={f.id}>
              <TableCell>{f.name}</TableCell>
              <TableCell>{f.job}</TableCell>
              <TableCell>{getSexName(f.sex)}</TableCell>
              <TableCell>{f.personality}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Row>
    </div>
  );
});

export const BarList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(decoratedComponent);
