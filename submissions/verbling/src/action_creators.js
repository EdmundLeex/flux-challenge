import fetch from 'isomorphic-fetch';

export const RECEIVED_JEDI = 'RECEIVED_JEDI';
function receivedJedi(jedi, idx) {
  return {
    type: RECEIVED_JEDI,
    jedi: jedi,
    idx: idx
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
export function fetchDarkJedi(id, idx, url = DEFAULT_URL) {
  return function(dispatch) {
    fetch(`${url}/dark-jedis/${id}`)
      .then(response => response.json())
      .then(json => dispatch(receivedJedi(json)))
      .then(() => dispatch(populateJedis()))
      .catch(err => console.log(err));
  }
}

const DEFAULT_JEDI_ID = 3616;
export function populateJedis() {
  return function(dispatch, getState) {
    let state = getState();
    let jedis = state.get('darkJedis');
    let firstJedi = jedis.find(entry => entry.get('name') !== undefined);
    let firstJediIdx = jedis.indexOf(firstJedi);
    // let firstEmptyIdx = jedis.findIndex(entry => entry.get('name') === undefined);

    if (firstJediIdx === -1){
      dispatch(fetchDarkJedi(DEFAULT_JEDI_ID, 0));
    } else if (firstJediIdx === 0) {
      let lastJedi = jedis.findLast(entry => entry.get('name') !== undefined);
      let lastJediIdx = jedis.indexOf(lastJedi);
      let nextId = lastJedi.get('apprentice').id;

      if (lastJediIdx < state.get('listSize') - 1 && nextId !== null) {
        dispatch(fetchDarkJedi(nextId), lastJediIdx + 1);
      }
    } else {

    }
  }
}
