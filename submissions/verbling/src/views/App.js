import React from 'react';
import { List, Map } from 'immutable';
import { ObiwanContainer } from './obiwan';
import SithList from './sith_list';

let xendor = Map({
  id: 5105,
  name: 'Xendor',
  homeworld: Map({
    id: 58,
    name: 'Coruscant',
  }),
  master: null,
  apprentice: 4629,
});

let ajuntaPall = Map({
  id: 4629,
  name: 'Ajunta Pall',
  homeworld: Map({
    id: 19,
    name: 'Alderaan',
  }),
  master: 5105,
  apprentice: 4601,
});

let simus = Map({
  id: 4601,
  name: 'Simus',
  homeworld: Map({
    id: 27,
    name: 'Korriban',
  }),
  master: 4629,
  apprentice: 2950,
});

let siths = List.of(xendor, ajuntaPall, simus);

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ObiwanContainer />
        <SithList siths={siths}/>
      </div>
    );
  }
}
