import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { ActionCreators } from '../types';

export const homeIndexReducer = (state: StoredState) =>
  reducerWithInitialState(state.homeIndexState).case(
    homeIndexActionCreators.add,
    (s, p) => {
      return Object.assign({}, s, { count: s.count + p });
    },
  );
interface Event {
  add: number;
}
const factory = actionCreatorFactory();
export const homeIndexActionCreators: ActionCreators<Event> = {
  add: factory<number>('add'),
};
