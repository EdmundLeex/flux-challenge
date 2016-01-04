import React from 'react/addons';
import { List, Map } from 'immutable';
import SithList from '../../src/views/sith_list';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = React.addons.TestUtils;

describe('SithList', () => {
  it('renders a list of siths, and two scroll buttons', () => {
    const sith1 = Map({
      id: 5105,
      name: 'Xendor',
      homeworld: Map({
        id: 58,
        name: 'Coruscant',
      }),
      master: null,
      apprentice: 4629,
    });
    const sith2 = Map({
      id: 4629,
      name: 'Ajunta Pall',
      homeworld: Map({
        id: 19,
        name: 'Alderaan',
      }),
      master: 5105,
      apprentice: 4601,
    });
    const component = renderIntoDocument(
      <SithList siths={List([sith1, sith2])} />
    );
    const sithList = scryRenderedDOMComponentsWithTag(component, 'section')[0];

    expect(sithList.children[0].tagName).to.equal('UL');
    expect(sithList.children[0].children.length).to.equal(2);
    expect(sithList.children[1].tagName).to.equal('DIV');
    expect(sithList.children[1].children.length).to.equal(2);
  });
});