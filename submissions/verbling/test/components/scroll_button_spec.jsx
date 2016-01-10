import React from 'react/addons';
import { List, Map } from 'immutable';
import ScrollButton from '../../src/views/scroll_button';
import { expect } from 'chai';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = React.addons.TestUtils;

describe('SithList', () => {
  it('renders a button with correct direction', () => {
    const upBtn = renderIntoDocument(
      <ScrollButton dir={'up'} buttonsState={Map({up: true, down: true})} />
    );
    const downBtn = renderIntoDocument(
      <ScrollButton dir={'down'} buttonsState={Map({up: true, down: true})} />
    );
    const upBtnComponent = findRenderedDOMComponentWithClass(upBtn, 'css-button-up');
    const downBtnComponent = findRenderedDOMComponentWithClass(downBtn, 'css-button-down');

    expect(upBtnComponent.className).to.contain('up');
    expect(downBtnComponent.className).to.contain('down');
  });
});
