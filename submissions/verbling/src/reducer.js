import { List, Map } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function updatePlanet(state, planet) {
  return state.set('planet', planet);
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'NEW_PLANET':
    return updatePlanet(state, action.planet);
  }
  return state;
}