import { List, Map } from 'immutable';
import * as action_creators from './action_creators';

function updatePlanet(state, planet) {
  return state.set('planet', planet);
}

function receivedJedi(state, jedi, idx) {
  return state.update('darkJedis', jedis => {
    return jedis.set(idx, jedi);
  });
}

const DEFAULT_LIST_SIZE = 5;
const EMPTY_LIST = (() => {
  let arr = [];
  for(let i = 0; i < DEFAULT_LIST_SIZE; i++) {
    arr.push(Map({
      id: i
    }))
  }
  return List(arr);
})();
const DEFAULT_STATE = Map({
  listSize: DEFAULT_LIST_SIZE,
  planet: '',
  darkJedis: EMPTY_LIST
});

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case action_creators.RECEIVED_JEDI:
    return receivedJedi(state, Map(action.jedi), action.idx);
  case action_creators.NEW_PLANET:
    return updatePlanet(state, action.planet);
  }
  return state;
}