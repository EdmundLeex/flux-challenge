import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SithItem from './sith_item';

export default React.createClass({
  mixins: [PureRenderMixin],
  getSiths: function () {
    return this.props.siths;
  },
  render: function () {
    return (
      <ul className="css-slots">
        {this.getSiths().map(sith => {
          return (
            <SithItem key={sith.get('id')} sith={sith} />
          );
        })}
      </ul>
    );
  }
})