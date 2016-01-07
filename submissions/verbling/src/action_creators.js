import fetch from 'isomorphic-fetch';

export const REQUEST_JEDI = 'REQUEST_JEDI';
function requestSith() {
  return {
    type: REQUEST_JEDI
  }
}

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

const DEFAULT_INITIAL_ID = 3616;
export function populateJedis() {
  return function(dispatch) {
    dispatch(requestSith());

  }
}

export function populateSiths() {
  let jedis = state.get('jedis');
  if (jedis.size < 5) {
    let lastSith = jedis.last();
    if (!lastSith) lastSith = fetchSith(3616);
    let nextSithId = lastSith.get('apprentice');
    let nextSith = fetchSith(nextSithId);

    return state.update('jedis', jedis => {
      return jedis.push(nextSith);
    });
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