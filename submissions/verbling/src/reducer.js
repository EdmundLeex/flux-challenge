import { List, Map } from 'immutable';
import * as actionCreators from './action_creators';

function updatePlanet(state, planet) {
  return state.set('planet', planet);
}

function fillJediToList(state, jedi, idx) {
  return state.update('darkJedis', jedis => {
    return jedis.set(idx, jedi);
  });
}

function scroll(state, dir) {
  let listSize = state.get('listSize');
  if (dir === 'up') {
    return state.update('darkJedis', jedis => {
      return jedis.splice(0, 2).push(Map({id: i += 1}), Map({id: i += 1}));
    });
  } else {
    return state.update('darkJedis', jedis => {
      return jedis.splice(listSize - 2, listSize - 1).unshift(Map({id: i += 1}), Map({id: i += 1}));
    })
  }
}

function highlightJedi(state, idx) {
  return state.update('darkJedis', jedis => {
    let jedi = jedis.get(idx);
    return jedis.set(idx, jedi.set('visiting', true));
  });
}

function unhighlightJedi(state) {
  return state.update('darkJedis', jedis => {
    return jedis.map(jedi => jedi.set('visiting', false));
  })
}

function disableButton(state, button) {
  return state.update('buttonsState', btns => {
    return btns.set(button, false);
  })
}

function enableButton(state, button) {
  return state.update('buttonsState', btns => {
    return btns.set(button, true);
  })
}

const DEFAULT_LIST_SIZE = 5;
var i;
const EMPTY_LIST = (() => {
  let arr = [];
  for(i = 0; i < DEFAULT_LIST_SIZE; i++) {
    arr.push(Map({
      id: i
    }))
  }
  return List(arr);
})();
const DEFAULT_STATE = Map({
  listSize: DEFAULT_LIST_SIZE,
  planet: '',
  darkJedis: EMPTY_LIST,
  buttonsState: Map({
    up: true,
    down: true
  })
});

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case actionCreators.FILL_JEDI_TO_LIST:
    return fillJediToList(state, Map(action.jedi), action.idx);
  case actionCreators.NEW_PLANET:
    return updatePlanet(state, action.planet);
  case actionCreators.SCROLL:
    return scroll(state, action.dir);
  case actionCreators.HIGHLIGHT_JEDI:
    return highlightJedi(state, action.idx);
  case actionCreators.UNHIGHLIGHT_JEDI:
    return unhighlightJedi(state);
  case actionCreators.DISABLE_BUTTON:
    return disableButton(state, action.button);
  case actionCreators.ENABLE_BUTTON:
    return enableButton(state, action.button);
  }
  return state;
}