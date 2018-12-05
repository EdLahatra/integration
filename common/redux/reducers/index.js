import { combineReducers } from 'redux';

import crud from './crud';

const app = combineReducers({
  log: (_, action) => {
    // eslint-disable-next-line no-console
    console.log(action);
    return {};
  },
  crud,
});

export default app;
