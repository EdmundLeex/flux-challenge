import request from 'superagent-bluebird-promise';

export const FILL_JEDI_TO_LIST = 'FILL_JEDI_TO_LIST';
export function fillJediToList(jedi, idx) {
  return {
    type: FILL_JEDI_TO_LIST,
    jedi: jedi,
    idx: idx
  }
}

export const HIGHLIGHT_JEDI = 'HIGHLIGHT_JEDI';
export function highlightJedi(idx) {
  return {
    type: HIGHLIGHT_JEDI,
    idx
  }
}

export const UNHIGHLIGHT_JEDI = 'UNHIGHLIGHT_JEDI';
export function unhighlightJedi() {
  return {
    type: UNHIGHLIGHT_JEDI
  }
}

export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export function disableButton(button) {
  return {
    type: DISABLE_BUTTON,
    button
  }
}

export const ENABLE_BUTTON = 'ENABLE_BUTTON';
export function enableButton(button) {
  return {
    type: ENABLE_BUTTON,
    button
  }
}

export const FREEZE = 'FREEZE';
export function freeze() {
  return {
    type: FREEZE
  }
}

export const UNFREEZE = 'UNFREEZE';
export function unfreeze() {
  return {
    type: UNFREEZE
  }
}

export function alertObiwan(idx) {
  return function (dispatch) {
    dispatch(highlightJedi(idx));
    dispatch(freeze());
  }
}

export function cancelAlert() {
  return function (dispatch) {
    dispatch(unhighlightJedi());
    dispatch(unfreeze());
  }
}

export function checkJedi() {
  return function (dispatch, getState) {
    let jedis = getState().get('darkJedis');
    let planet = getState().get('planet');
    let homeworlds = jedis.map((jedi) => {
      let homeworld = jedi.get('homeworld');
      return (homeworld) ? homeworld.name : null;
    })

    let idx = homeworlds.indexOf(planet);
    if (idx !== -1) {
      dispatch(alertObiwan(idx));
    } else {
      dispatch(cancelAlert());
    }
  }
}

export function arrivedNewPlanet(planet) {
  return function (dispatch, getState) {
    dispatch(newPlanet(planet));
    dispatch(cancelAlert());
    dispatch(checkJedi());
  };
}

export const NEW_PLANET = 'NEW_PLANET';
export function newPlanet(planet) {
  return {
    meta: { remote: true },
    type: NEW_PLANET,
    planet
  };
}

function cancelRequests() {
  for(let key in requests) {
    requests[key].cancel();
    delete requests[key];
  }
}

export function scrolling(dir) {
  return function(dispatch, getState) {
    if (dir === 'up') {
      dispatch(enableButton('down'));
      dispatch(scroll('down'));
      cancelRequests();
      dispatch(populateJedis('up'));
    } else {
      dispatch(enableButton('up'));
      dispatch(scroll('up'));
      cancelRequests();
      dispatch(populateJedis('down'));
    }
  };
}

export const SCROLL = 'SCROLL';
function scroll(dir) {
  return {
    type: SCROLL,
    dir
  };
}

const requests = {};
const DEFAULT_URL = 'http://localhost:3000';
export function fetchDarkJedi(id, dir, dispatch, getState, url = DEFAULT_URL) {
  requests[id] = request
    .get(`${url}/dark-jedis/${id}`)
    .then((response) => {
      let receive = receivedJedi(JSON.parse(response.text), dir, dispatch, getState);
      delete requests[id];
      let populate = dispatch(populateJedis(dir));
      return [receive, populate];
    })
    .catch(err => console.log(err));
}

const DEFAULT_JEDI_ID = 3616;
export function populateJedis(dir) {
  return function(dispatch, getState) {
    let state = getState();
    let jedis = state.get('darkJedis');
    let listSize = state.get('listSize');

    if (dir === 'up') {
      populateUp(dispatch, getState, jedis);
    } else if (dir === 'down') {
      populateDown(dispatch, getState, jedis, listSize);
    } else {
      fetchDarkJedi(DEFAULT_JEDI_ID, 'down', dispatch, getState);
    }
  };
}

function populateUp(dispatch, getState, jedis) {
  let firstJediIdx = jedis.findIndex(entry => entry.get('name') !== undefined);
  let firstJedi = jedis.get(firstJediIdx);
  let nextId = firstJedi.get('master').id;
  if (firstJediIdx > 0 && nextId !== null) {
    fetchDarkJedi(nextId, 'up', dispatch, getState);
  } else if (nextId === null) {
    dispatch(disableButton('up'));
  }
}

function populateDown(dispatch, getState, jedis, listSize) {
  let lastJedi = jedis.findLast(entry => entry.get('name') !== undefined);
  let lastJediIdx = jedis.indexOf(lastJedi);
  let nextId = lastJedi.get('apprentice').id;

  if (lastJediIdx < listSize && nextId !== null) {
    fetchDarkJedi(nextId, 'down', dispatch, getState);
  } else if (nextId === null) {
    dispatch(disableButton('down'));
  }
}

function receivedJedi(jedi, dir, dispatch, getState) {
  let jedis = getState().get('darkJedis');
  let idx = 0;
  if (dir === 'down') {
    idx = jedis.findLastIndex(entry => entry.get('name') !== undefined) + 1;
  } else {
    idx = jedis.findIndex(entry => entry.get('name') !== undefined) - 1;
  }
  dispatch(fillJediToList(jedi, idx));
  dispatch(checkJedi());
}