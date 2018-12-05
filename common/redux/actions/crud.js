export const ADD = 'ADD';

export const add = payload =>
  (dispatch) => {
    // this.services.add();
    dispatch({
      type: ADD,
      payload,
    });
  };
