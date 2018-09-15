import { StoredState } from '../stores/stored-state';

export const getInitialStoredState = () => {
  return {
    homeIndexState: {
      count: 0,
    },
  } as StoredState;
};
