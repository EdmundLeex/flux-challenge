import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { newPlanet } from './action_creators';
import App from './views/App';

const socket = new WebSocket('ws://localhost:4000');

socket.onmessage = (msg) => {
  let planet = JSON.parse(msg.data).name;
  store.dispatch(newPlanet(planet));
};

const store = createStore(reducer);

store.dispatch({
  type: 'SET_STATE',
  state: {
    planet: 'Apatros'
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
