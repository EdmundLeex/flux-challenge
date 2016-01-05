import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export const Obiwan = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return (
      <h1 className="css-planet-monitor">
        Obi-Wan currently on {this.props.planet}
      </h1>
    );
  }
})

function mapStateToProps(state) {
  return {
    planet: state.get('planet')
  };
}

export const ObiwanContainer = connect(
  mapStateToProps,
  actionCreators
)(Obiwan);