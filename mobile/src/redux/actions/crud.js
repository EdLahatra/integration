export const ADD = 'ADD';

export const add = payload =>
  (dispatch) => {
    dispatch({
      type: ADD,
      payload,
    });
  };
