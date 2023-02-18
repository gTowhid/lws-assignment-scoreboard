// initial state
const initialState = {
  value: 0,
};

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === 'increment') {
    return {
      ...state,
      value: state.value + 1,
    };
  } else if (action.type === 'decrement') {
    return {
      ...state,
      value: state.value - 1,
    };
  }
}
