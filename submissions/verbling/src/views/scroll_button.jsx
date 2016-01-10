import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getDir: function () {
    return this.props.dir;
  },
  scroll: function () {
    let dir = this.props.dir;
    let enabled = this.props.buttonsState.get(this.props.dir);
    let freezed = this.props.freezed;

    if (enabled && !freezed) {
      if (dir === 'up') {
        this.props.scrolling('up');
      } else {
        this.props.scrolling('down');
      }
    }
  },
  render: function () {
    let enabled = this.props.buttonsState.get(this.props.dir);
    let freezed = this.props.freezed;
    let disabledClass = (enabled && !freezed) ? "" : "css-button-disabled";

    return (
      <button className={`css-button-${this.getDir()} ${disabledClass}`}
              onClick={this.scroll}>
      </button>
    );
  }
})