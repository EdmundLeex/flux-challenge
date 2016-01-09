import request from 'superagent-bluebird-promise';

export const FILL_JEDI_TO_LIST = 'FILL_JEDI_TO_LIST';
export function fillJediToList(jedi, idx) {
  return {
    type: FILL_JEDI_TO_LIST,
    jedi: jedi,
    idx: idx
  }
}

export const RECEIVED_JEDI = 'RECEIVED_JEDI';
function receivedJedi(jedi, dir) {
  return function (dispatch, getState) {
    let jedis = getState().get('darkJedis');
    let idx = 0;
    if (dir === 'down') {
      idx = jedis.findLastIndex(entry => entry.get('name') !== undefined) + 1;
    } else {
      idx = jedis.findIndex(entry => entry.get('name') !== undefined) - 1;
    }
    dispatch(fillJediToList(jedi, idx));
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

export function cancelRequests() {
  return function () {
    for(let key in requests) {
      requests[key].cancel();
      delete requests[key];
    }
  }
}

export function scrolling(dir) {
  return function(dispatch, getState) {
    if (dir === 'up') {
      dispatch(scrollDown());
      dispatch(cancelRequests());
      dispatch(populateJedis('up'));
    } else {
      dispatch(scrollUp());
      dispatch(cancelRequests());
      dispatch(populateJedis('down'));
    }
  }
}

export const SCROLL_UP = 'SCROLL_UP';
function scrollUp() {
  console.log('scrollup')
  return {
    type: SCROLL_UP
  };
}

export const SCROLL_DOWN = 'SCROLL_DOWN';
export function scrollDown() {
  return {
    type: SCROLL_DOWN
  };
}

const requests = {};
const DEFAULT_URL = 'http://localhost:3000';
export function fetchDarkJedi(id, dir, url = DEFAULT_URL) {
  return function(dispatch) {
    requests[id] = request
      .get(`${url}/dark-jedis/${id}`)
      .then((response) => {
        let receive = dispatch(receivedJedi(JSON.parse(response.text), dir));
        delete requests[id];
        let populate = dispatch(populateJedis(dir));
        return [receive, populate];
      })
      .catch(err => console.log(err));
  }
}

const DEFAULT_JEDI_ID = 3616;
export function populateJedis(dir) {
  return function(dispatch, getState) {
    let state = getState();
    let jedis = state.get('darkJedis');
    let listSize = state.get('listSize');

    if (dir === 'up') {
      let firstJediIdx = jedis.findIndex(entry => entry.get('name') !== undefined);
      let firstJedi = jedis.get(firstJediIdx);
      let nextId = firstJedi.get('master').id;
      if (firstJediIdx > 0 && nextId !== null) {
        dispatch(fetchDarkJedi(nextId, 'up'));
      }
    } else if (dir === 'down') {
      let lastJedi = jedis.findLast(entry => entry.get('name') !== undefined);
      let lastJediIdx = jedis.indexOf(lastJedi);
      let nextId = lastJedi.get('apprentice').id;

      if (lastJediIdx < state.get('listSize') - 1 && nextId !== null) {
        dispatch(fetchDarkJedi(nextId, 'down'));
      }
    } else {
      dispatch(fetchDarkJedi(DEFAULT_JEDI_ID, 'down'));
    }
  }
}
