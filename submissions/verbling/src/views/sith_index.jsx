import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SithItem from './sith_item';

export default React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function () {
    this.props.populateJedis();
  },
  render: function () {
    let listSize = this.props.listSize;
    let jedis = this.props.darkJedis;

    return (
      <ul className="css-slots">
        {jedis.map(jedi => {
          return (
            <SithItem key={jedi.get('id')} jedi={jedi} />
        )})}
      </ul>
    );
  }
})