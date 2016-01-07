import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    let jedi = this.props.jedi;
    let name = jedi.get('name') || "";
    let home = `Homeworld: ${jedi.getIn(['homeworld', 'name']) || ""}`
    return (
      <li className="css-slot">
        <h3>{name}</h3>
        <h6>{home}</h6>
      </li>
    );
  }
})