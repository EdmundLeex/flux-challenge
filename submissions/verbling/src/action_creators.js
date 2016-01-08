import fetch from 'isomorphic-fetch';

export const RECEIVED_JEDI = 'RECEIVED_JEDI';
function receivedJedi(id, jedi) {
  return {
    type: RECEIVED_JEDI,
    id,
    jedi: jedi
  }
}

export const NEW_PLANET = 'NEW_PLANET';
export function newPlanet(planet) {
  return {
    meta: { remote: true },
    type: NEW_PLANET,
    planet
  };
}

export const SCROLL_UP = 'SCROLL_UP';


const DEFAULT_URL = 'http://localhost:3000';
export function fetchDarkJedi(id, url = DEFAULT_URL) {
  return function(dispatch) {
    fetch(`${url}/dark-jedis/${id}`)
      .then(response => response.json())
      .then(json => dispatch(receivedJedi(id, json)))
      .then(() => dispatch(populateJedis()))
      .catch(err => console.log(err));
  }
}

export function populateJedis() {
  return function(dispatch, getState) {
    let state = getState();
    let jedis = state.get('darkJedis');
    let firstJedi = jedis.find(entry => entry.get('name') !== undefined);
    let firstJediIdx = jedis.indexOf(firstJedi);
    // let firstEmptyIdx = jedis.findIndex(entry => entry.get('name') === undefined);

    if (firstJediIdx === -1){
      dispatch(fetchDarkJedi(3616));
    } else if (firstJediIdx === 0) {
      let lastJedi = jedis.findLast(entry => entry.get('name') !== undefined);
      let lastJediIdx = jedis.indexOf(lastJedi);
      let nextId = lastJedi.get('apprentice').id;

      if (lastJediIdx < state.get('listSize') - 1 && nextId !== null) {
        dispatch(fetchDarkJedi(nextId));
      }
    } else {
    }
  }
}
