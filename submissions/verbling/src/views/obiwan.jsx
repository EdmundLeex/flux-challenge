import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getPlanet: function () {
    return this.props.planet;
  },
  render: function () {
    return (
      <h1 className="css-planet-monitor">
        Obi-Wan currently on {this.getPlanet()}
      </h1>
    );
  }
})