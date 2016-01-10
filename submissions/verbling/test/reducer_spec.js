import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles current planet change', () => {
    const initialState = Map({
      planet: 'Cato Neimoidia'
    });
    const action = {
      type: 'NEW_PLANET',
      planet: 'Dagobah'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      planet: 'Dagobah'
    }));
  });

  it('handles scroll up', () => {
    const sith1 = Map({
      id: 5105,
      name: 'Xendor',
      homeworld: {
        id: 58,
        name: 'Coruscant',
      },
      master: null,
      apprentice: 4629,
    });
    const sith2 = Map({
      id: 4629,
      name: 'Ajunta Pall',
      homeworld: {
        id: 19,
        name: 'Alderaan',
      },
      master: 5105,
      apprentice: 4601,
    });
    const sith3 = Map({
      id: 4601,
      name: 'Simus',
      homeworld: {
        id: 27,
        name: 'Korriban',
      },
      master: 4629,
      apprentice: 2950,
    });
    const empty1 = Map({
      id: 6
    });
    const empty2 = Map({
      id: 7
    });
    const initialState = fromJS({
      darkJedis: List.of(sith1, sith2, sith3)
    });
    const action = {
      type: 'SCROLL',
      dir: 'up'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      darkJedis: List.of(sith3, empty1, empty2)
    }));
  });

  it('handles scroll down', () => {
    const sith1 = Map({
      id: 5105,
      name: 'Xendor',
      homeworld: {
        id: 58,
        name: 'Coruscant',
      },
      master: null,
      apprentice: 4629,
    });
    const sith2 = Map({
      id: 4629,
      name: 'Ajunta Pall',
      homeworld: {
        id: 19,
        name: 'Alderaan',
      },
      master: 5105,
      apprentice: 4601,
    });
    const sith3 = Map({
      id: 4601,
      name: 'Simus',
      homeworld: {
        id: 27,
        name: 'Korriban',
      },
      master: 4629,
      apprentice: 2950,
    });
    const empty1 = Map({
      id: 8
    });
    const empty2 = Map({
      id: 9
    });
    const initialState = fromJS({
      darkJedis: List.of(sith1, sith2, sith3)
    });
    const action = {
      type: 'SCROLL',
      dir: 'down'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      darkJedis: List.of(empty1, empty2, sith1, sith2, sith3)
    }));
  });
})