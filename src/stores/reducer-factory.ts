import { StoredState } from './stored-state';
import { combineReducers, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import { StoreProviderProps } from './components/store-provider';
import { homeIndexReducer } from './home/home-index-reducer';

const createReducers = (initialState: StoredState) =>
  combineReducers<StoredState>({
    homeIndexState: homeIndexReducer(initialState),
  });
const createLocalStorageSetting = (...key: Array<keyof StoredState>) =>
  persistState(key);
const enhancer = compose(createLocalStorageSetting('homeIndexState'));
export const createAppStore = (props: StoreProviderProps) =>
  createStore(createReducers(props.initialState), enhancer);
