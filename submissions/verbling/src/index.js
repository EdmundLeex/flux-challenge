import 'babel-core/register';
import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { newPlanet } from './action_creators';
import App from './views/App';
import * as actionCreators from './action_creators';

const SOCKET_URL = 'ws://localhost:4000';
const socket = new WebSocket(SOCKET_URL);

const store = applyMiddleware(thunk)(createStore)(reducer);

socket.onmessage = (msg) => {
  let planet = JSON.parse(msg.data).name;
  store.dispatch(newPlanet(planet));
};

let lastUpdatedJediId = -1;
function populateJedis(state, dispatch) {
  let jedis = state.get('darkJedis');
  let firstEmptyIdx = jedis.findIndex(entry => entry.get('name') === undefined);

  if (firstEmptyIdx === 0) {
    let firstJedi = jedis.find(entry => entry.get('name') !== undefined);
    let firstJediIdx = jedis.indexOf(firstJedi);

  } else {
    let lastJedi = jedis.findLast(entry => entry.get('name') !== undefined);
    let lastJediIdx = jedis.indexOf(lastJedi);
    let nextId = lastJedi.get('apprentice').id;

    if (nextId !== lastUpdatedJediId) {
      if (lastJediIdx < 4 && nextId !== null) {
        lastUpdatedJediId = nextId;
        dispatch(actionCreators.fetchDarkJedi(nextId));
      }
    }
  }
}

var actors = [populateJedis]

var acting = false
store.subscribe(function() {
  if (!acting) {
    acting = true
    actors.forEach(actor => {
      actor(store.getState(), store.dispatch);
    })
    acting = false
  }
});

// store.dispatch(setState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
