import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getSith: function () {
    return this.props.sith;
  },
  render: function () {
    let sith = this.getSith();
    return (
      <li className="css-slot">
        <h3>{sith.get('name')}</h3>
        <h6>{`Homeworld: ${sith.getIn(['homeworld', 'name'])}`}</h6>
      </li>
    );
  }
})