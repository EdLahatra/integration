import { ADD } from '../actions/crud';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    default:
      return state;
  }
};
