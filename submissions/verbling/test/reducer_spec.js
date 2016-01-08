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
})