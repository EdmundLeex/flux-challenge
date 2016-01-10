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

export const FREEZE_UI = 'FREEZE_UI';
export function freezeUI() {
  return {
    type: FREEZE_UI
  }
}

export const UNFREEZE_UI = 'UNFREEZE_UI';
export function unfreezeUI() {
  return {
    type: UNFREEZE_UI
  }
}

export const NEW_PLANET = 'NEW_PLANET';
export function newPlanet(planet) {
  return {
    type: NEW_PLANET,
    planet
  };
}

export const SCROLL = 'SCROLL';
function scroll(dir) {
  return {
    type: SCROLL,
    dir
  };
}

export function arrivedNewPlanet(planet) {
  return function (dispatch, getState) {
    dispatch(newPlanet(planet));
    cancelAlert(dispatch, getState);
    checkJedi(dispatch, getState);
  };
}

export function scrolling(dir) {
  return function(dispatch, getState) {
    if (dir === 'up') {
      dispatch(enableButton('down'));
      dispatch(scroll('down'));
      cancelRequests();
      dispatch(populateJedis());
    } else {
      dispatch(enableButton('up'));
      dispatch(scroll('up'));
      cancelRequests();
      dispatch(populateJedis());
    }
  };
}

const DEFAULT_JEDI_ID = 3616;
export function populateJedis() {
  return function(dispatch, getState) {
    let state = getState();
    let jedis = state.get('darkJedis');
    let listSize = state.get('listSize');
    let firstJediIdx = jedis.findIndex(entry => entry.get('name') !== undefined);
    let lastJediIdx = jedis.findLastIndex(entry => entry.get('name') !== undefined);

    if (firstJediIdx === -1) {
      fetchDarkJedi(DEFAULT_JEDI_ID, 'down', dispatch, getState);
    } else {
      if (firstJediIdx > 0) {
        populateUp(dispatch, getState, jedis, firstJediIdx);
      } else if (lastJediIdx < listSize - 1) {
        populateDown(dispatch, getState, jedis, lastJediIdx, listSize);
      }
    }
  }
}

const requests = {};
const DEFAULT_URL = 'http://localhost:3000';
function fetchDarkJedi(id, dir, dispatch, getState, url = DEFAULT_URL) {
  requests[id] = request
    .get(`${url}/dark-jedis/${id}`)
    .then((response) => {
      let receive = receivedJedi(JSON.parse(response.text), dir, dispatch, getState);
      delete requests[id];
      let populate = dispatch(populateJedis());
      return [receive, populate];
    })
    .catch(err => console.log(err));
}

function populateUp(dispatch, getState, jedis, firstJediIdx) {
  let firstJedi = jedis.get(firstJediIdx);
  let nextId = firstJedi.get('master').id;
  if (firstJediIdx > 0 && nextId !== null) {
    fetchDarkJedi(nextId, 'up', dispatch, getState);
  } else if (nextId === null) {
    dispatch(disableButton('up'));
  }
}

function populateDown(dispatch, getState, jedis, lastJediIdx, listSize) {
  let lastJedi = jedis.get(lastJediIdx);
  let nextId = lastJedi.get('apprentice').id;

  if (lastJediIdx < listSize - 1 && nextId !== null) {
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
  checkJedi(dispatch, getState);
}

function freeze(dispatch) {
  cancelRequests();
  dispatch(freezeUI());
}

function unfreeze(dispatch) {
  dispatch(unfreezeUI());
  dispatch(populateJedis());
}

function cancelRequests() {
  for(let key in requests) {
    requests[key].cancel();
    delete requests[key];
  }
}

function cancelAlert(dispatch, getState) {
  dispatch(unhighlightJedi());
  if (getState().get('freezed')) unfreeze(dispatch);
}

function checkJedi(dispatch, getState) {
  let jedis = getState().get('darkJedis');
  let planet = getState().get('planet');
  let homeworlds = jedis.map((jedi) => {
    let homeworld = jedi.get('homeworld');
    return (homeworld) ? homeworld.name : null;
  })

  let idx = homeworlds.indexOf(planet);
  if (idx !== -1) {
    alertObiwan(dispatch, idx);
  } else {
    cancelAlert(dispatch, getState);
  }
}

function alertObiwan(dispatch, idx) {
  dispatch(highlightJedi(idx));
  freeze(dispatch);
}