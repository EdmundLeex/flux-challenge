import React from 'react/addons';
import { Map } from 'immutable';
import SithItem from '../../src/views/sith_item';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = React.addons.TestUtils;

describe('SithItem', () => {
  it('renders an entry of sith', () => {
    const jedi = Map({
      id: 5105,
      name: 'Xendor',
      homeworld: Map({
        id: 58,
        name: 'Coruscant',
      }),
      master: null,
      apprentice: 4629,
    });
    const component = renderIntoDocument(
      <SithItem key={jedi.get('id')} jedi={jedi} />
    );
    const jediItem = scryRenderedDOMComponentsWithTag(component, 'li')[0];

    expect(jediItem.textContent).to.contain('Xendor');
    expect(jediItem.textContent).to.contain('Coruscant');
  });
});