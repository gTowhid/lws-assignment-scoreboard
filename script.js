// select DOM elements
const counterEl = document.getElementById('counter');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');
const resetEl = document.getElementById('reset');
const addMatchEl = document.getElementById('addMatch');


// action identifiers
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';

// action creators
const increment = (value) => {
    return {
        type: INCREMENT,
        payload: value,
      }
}

const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value,
      }
}

const reset = () => {
    return {
        type: RESET
      }
}

// initial state
const initialState = {
  value: 0,
};

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + action.payload,
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      value:
        (state.value - action.payload || state.value) > 0
          ? state.value - action.payload
          : 0,
    };
  } else if (action.type === RESET) {
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

    store.dispatch(increment(parseInt(e.target.value)));
    
    e.target.value = '';
  }
});

decrementEl.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    e.preventDefault();

    store.dispatch(decrement(parseInt(e.target.value)));
    
    e.target.value = '';
  }
});

resetEl.addEventListener('click', () => {
  store.dispatch(reset());
});


addMatchEl.addEventListener('click', () => {
    const node = document.querySelector(".match");
    const clone = node.cloneNode(true);

    document.querySelector(".all-matches").appendChild(clone).setAttribute('id', 'match2');
 });