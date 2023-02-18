// select DOM elements
const counterEl = document.getElementById('counter');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');
const resetEl = document.getElementById('reset');

// initial state
const initialState = {
  value: 0,
};

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === 'increment') {
    return {
      ...state,
      value: state.value + action.payload,
    };
  } else if (action.type === 'decrement') {
    return {
      ...state,
      value:
        (state.value - action.payload || state.value) > 0
          ? state.value - action.payload
          : 0,
    };
  } else if (action.type === 'reset') {
    return {
      ...state,
      value: 0,
    };
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  counterEl.innerText = state.value;
};

render();

store.subscribe(render);

// event listeners
incrementEl.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    e.preventDefault();

    store.dispatch({
      type: 'increment',
      payload: parseInt(e.target.value),
    });
  }
});

decrementEl.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    e.preventDefault();

    store.dispatch({
      type: 'decrement',
      payload: parseInt(e.target.value),
    });
  }
});

resetEl.addEventListener('click', () => {
  store.dispatch({
    type: 'reset',
  });
});
