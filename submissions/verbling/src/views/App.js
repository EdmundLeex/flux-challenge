import React from 'react';
import { List, Map } from 'immutable';
import { ObiwanContainer } from './obiwan';
import { SithListContainer } from './sith_list';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ObiwanContainer />
        <SithListContainer />
      </div>
    );
  }
}
