import React from 'react/addons';
import Obiwan from '../../src/views/obiwan';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = React.addons.TestUtils;

describe('Obiwan', () => {
  it('renders an <h1> tag', () => {
    const component = renderIntoDocument(
      <Obiwan planet={'Apatros'} />
    );
    const obiwan = scryRenderedDOMComponentsWithTag(component, 'h1')[0];

    expect(obiwan.textContent).to.contain('Apatros');
  });
});