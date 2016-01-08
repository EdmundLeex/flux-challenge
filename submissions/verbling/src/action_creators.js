import fetch from 'isomorphic-fetch';

export const RECEIVED_JEDI = 'RECEIVED_JEDI';
function receivedJedi(id, jedi) {
  return {
    type: RECEIVED_JEDI,
    id,
    jedi: jedi
  }
}

const DEFAULT_URL = 'http://localhost:3000';
export function fetchDarkJedi(id, url = DEFAULT_URL) {
  return function(dispatch) {
    fetch(`${url}/dark-jedis/${id}`)
      .then(response => response.json())
      .then(json =>
        dispatch(receivedJedi(id, json))
      ).catch(err => console.log(err));
  }
}

export function setState(state) {
  return {
    meta: { remote: true },
    type: 'SET_STATE',
    state
  }
}

export function newPlanet(planet) {
  return {
    meta: { remote: true },
    type: 'NEW_PLANET',
    planet
  };
}