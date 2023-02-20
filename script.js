const addMatchEl = document.getElementById('addMatch');
const allMatches = document.querySelector('.all-matches');
const resetEl = document.getElementById('reset');

let selector = 2; // reference point for new match name

// initial state
let initialState = {
  1: 0,
  active: 1,
}

// deleting existing match
allMatches.addEventListener('click', (e) => {
  if (e.target.parentNode.className === 'lws-delete') {
    e.target.parentNode.parentNode.parentNode.remove();
  }
});

// create reducer function
function counterReducer(state = initialState, action) {
  
  if (action.type === 'increment') {
    return {
      ...state,
      [action.id]: state[action.id] + action.payload,
      active: action.id
    };
  } else if (action.type === 'decrement') {
    return {
      ...state,
      [action.id]: (state[action.id] - action.payload || state[action.id]) > 0
      ? state[action.id] - action.payload
      : 0,
      active: action.id
    };
  } else if (action.type === 'addMatch') {

    const node = document.querySelector('.match');
    const clone = node.cloneNode(true);

    document
      .querySelector('.all-matches')
      .appendChild(clone)
      .setAttribute('id', `match${selector}`);
    document
      .getElementById(`match${selector}`)
      .querySelector('.wrapper')
      .querySelector('.lws-matchName').innerText = `Match ${selector}`;

    selector++;

    return {
      ...state,
      [action.id]: 0,
      active: action.id
    };
  } else if (action.type === 'reset') {

    const resetState = {
      ...state,
    }

    Object.keys(resetState).forEach((key) => {resetState[key] = 0});

    return resetState;
  } else {
    return state;
  }
}


// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();

  if (state.active) {
    const matchName = 'match' + state.active;
    document.getElementById(`${matchName}`).querySelector('.numbers').querySelector('.lws-singleResult').innerText = state[state.active];
  } else {
    document.querySelectorAll('.lws-singleResult').forEach((el) => {
      el.innerText = 0;
    });
  }
};

render();

store.subscribe(render);

// event listeners
allMatches.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    e.preventDefault();

    if (e.target.id === 'increment') {
      store.dispatch({
        type: 'increment',
        id: (e.target.parentNode.parentNode.parentNode.id).charAt(e.target.parentNode.parentNode.parentNode.id.length - 1),
        payload: parseInt(e.target.value),
      });
    }

    else if (e.target.id === 'decrement') {
      store.dispatch({
        type: 'decrement',
        id: (e.target.parentNode.parentNode.parentNode.id).charAt(e.target.parentNode.parentNode.parentNode.id.length - 1),
        payload: parseInt(e.target.value),
      });
    }

    e.target.value = '';
  }
});

addMatchEl.addEventListener('click', () => {
  store.dispatch({
    type: 'addMatch',
    id: selector,
  });
});

resetEl.addEventListener('click', () => {
  store.dispatch({
    type: 'reset'
  });
});
