import 'babel-core/register';
import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { newPlanet } from './action_creators';
import App from './views/App';
import { fillListActor } from './actors';

const SOCKET_URL = 'ws://localhost:4000';
const socket = new WebSocket(SOCKET_URL);

const store = applyMiddleware(thunk)(createStore)(reducer);

socket.onmessage = (msg) => {
  let planet = JSON.parse(msg.data).name;
  store.dispatch(newPlanet(planet));
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
