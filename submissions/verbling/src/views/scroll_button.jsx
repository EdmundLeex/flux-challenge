import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getDir: function () {
    return this.props.dir;
  },
  scroll: function () {
    let dir = this.props.dir;
    if (dir === 'up') {
      this.props.scrolling('up');
    } else {
      this.props.scrolling('down');
    }
    console.log(dir);
  },
  render: function () {
    return (
      <button className={`css-button-${this.getDir()}`}
              onClick={this.scroll}>
      </button>
    );
  }
})