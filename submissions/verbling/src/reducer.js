import { List, Map } from 'immutable';
import * as actions from './action_creators';

function updatePlanet(state, planet) {
  return state.set('planet', planet);
}

function receivedJedi(state, jedi) {
  return state.update('darkJedis', jedis => {
    return jedis.set(
      jedis.findIndex(item => {
        return item.get('name') === undefined;
      }), jedi);
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
  case actions.RECEIVED_JEDI:
    return receivedJedi(state, Map(action.jedi));
  case 'SET_STATE':
    return setState(state, action.state);
  case 'NEW_PLANET':
    return updatePlanet(state, action.planet);
  }
  return state;
}