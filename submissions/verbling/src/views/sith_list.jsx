import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import SithIndex from './sith_index';
import ScrollButton from './scroll_button';

export const SithList = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return (
      <section className="css-scrollable-list">
        <SithIndex {...this.props} />
        <div className="css-scroll-buttons">
          <ScrollButton dir={"up"} {...this.props} />
          <ScrollButton dir={"down"} {...this.props} />
        </div>
      </section>
    );
  }
})

function mapStateToProps(state) {
  return {
    listSize: state.get('listSize'),
    darkJedis: state.get('darkJedis'),
    buttonsState: state.get('buttonsState'),
    freezed: state.get('freezed')
  };
}

export const SithListContainer = connect(
  mapStateToProps,
  actionCreators
)(SithList);