const addMatchEl = document.getElementById('addMatch');
const allMatches = document.querySelector('.all-matches');

let selector = 2; // reference point for new match name

// initial state
let initialState = [
  {
    id: 'match1',
    value: 0,
  },
];

// adding new match
addMatchEl.addEventListener('click', () => {
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

  initialState.push({
    id: `match${selector}`,
    value: 0,
  });

  selector++;
});

// deleting existing match
allMatches.addEventListener('click', (e) => {
  if (e.target.parentNode.className === 'lws-delete') {
    e.target.parentNode.parentNode.parentNode.remove();
  }

  selector--;
});

// create reducer function
function counterReducer(state = initialState, action) {
  return [
    ...state,
    state.forEach((el) => {
      if (el.id === action.id) {
        if (action.type === 'increment') {
          return {
            ...el,
            value: el.value + 1,
          };
        } else if (action.type === 'decrement') {
          return {
            ...el,
            value: el.value - 1,
          };
        } else if (action.type === 'reset') {
          return {
            ...el,
            value: 0,
          };
        } else {
          return el;
        }
      }
    }),
  ];
}

// create store
const store = Redux.createStore(counterReducer);

const render = (id) => {
  const state = store.getState();

  console.log(state);
  // console.log(state[0].id);

  // state.forEach((el) => el && console.log(el.id));

  /* const matchId = state.forEach((el) => {
    if (el && el.id) return el.id;
  }); */

  const matchId = state[0].id;

  document
    .getElementById(matchId)
    .querySelector('.numbers')
    .querySelector('.lws-singleResult').innerText = state[0].value;
};

render('match1');

store.subscribe(render);

// event listeners
allMatches.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    e.preventDefault();

    console.log(e.target.parentNode.parentNode.parentNode.id);

    if (e.target.id === 'increment') {
      store.dispatch({
        type: 'increment',
        id: e.target.parentNode.parentNode.parentNode.id,
      });
    }

    // store.dispatch(increment(parseInt(e.target.value)));

    e.target.value = '';
  }
});
