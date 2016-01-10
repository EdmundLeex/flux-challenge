import React from 'react/addons';
import { List, Map } from 'immutable';
import SithIndex from '../../src/views/sith_index';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = React.addons.TestUtils;

describe('SithIndex', () => {
  it('renders a list of siths', () => {
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
    const populateJedis = (id) => {};
    const component = renderIntoDocument(
      <SithIndex darkJedis={List([sith1, sith2])}
                 populateJedis={populateJedis} />
    );
    const sithIndex = scryRenderedDOMComponentsWithTag(component, 'ul')[0];

    expect(sithIndex.children.length).to.equal(2);
    expect(sithIndex.children[0].textContent).to.contain('Xendor');
    expect(sithIndex.children[0].textContent).to.contain('Coruscant');
    expect(sithIndex.children[1].textContent).to.contain('Ajunta Pall');
    expect(sithIndex.children[1].textContent).to.contain('Alderaan');
  });
});