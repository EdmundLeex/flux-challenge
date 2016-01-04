import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SithIndex from './sith_index';
import ScrollButton from './scroll_button';

export default React.createClass({
  mixins: [PureRenderMixin],
  getSiths: function () {
    return this.props.siths;
  },
  render: function () {
    return (
      <section className="css-scrollable-list">
        <SithIndex siths={this.getSiths()} />
        <div className="css-scroll-buttons">
          <ScrollButton dir={"up"} />
          <ScrollButton dir={"down"} />
        </div>
      </section>
    );
  }
})