import * as React from 'react';
import logo from '../../common/statics/logo.svg';
import { Theme } from '../../common/styles/theme';
import { DispatchMapper, StateMapper } from '../../stores/types';
import { homeIndexActionCreators } from '../../stores/home/home-index-reducer';
import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import { decorate } from '../../common/styles/styles-helper';
import { StylesBase } from '../../common/styles/types';
import { Button } from '../../components/button';

interface Styles extends StylesBase {
  button: any;
  spinLogo: any;
  '@keyframes logo-spin': any;
}
const styles = (theme: Theme): Styles => ({
  root: { color: 'red' },
  button: { color: 'red' },
  spinLogo: {
    animation: ['logo-spin', 'infinite', '20s', 'linear'],
    height: (props: Props) => 80 + props.count,
  },
  '@keyframes logo-spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
});
interface Events {
  add: () => Action<number>;
}
interface Props {
  count: number;
}
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    add: () => dispatch(homeIndexActionCreators.add(1)),
  };
};
const mapStateToProps: StateMapper<Props> = ({ homeIndexState }) => {
  return {
    count: homeIndexState.count,
  };
};

const decoratedComponent = decorate(styles)<Props & Events>(props => {
  const { classes, count, add } = props;
  const { root, spinLogo, button } = classes;
  return (
    <div className={root}>
      <h1>{count}</h1>
      <Button onClick={add} className={button}>
        +
      </Button>
      <img src={logo} className={spinLogo} alt="logo" />
      test2
    </div>
  );
});

export const HomeIndex = connect(
  mapStateToProps,
  mapDispatchToProps,
)(decoratedComponent);
