import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// STORE
import { loadPractices } from 'redux/modules/practicesModule';
// COMPONENTS
import { LoadingScreen, RefreshButton } from 'components';

const mappedState = ({ practices }) => ({
  loadingPractices: practices.loadingPractices,
  practicesLoaded: practices.practicesLoaded,
  loadPracticesError: practices.loadPracticesError
});

const mappedActions = { loadPractices };

@connect(mappedState, mappedActions)
class BestPracticesContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.object.isRequired,
    loadingPractices: PropTypes.bool.isRequired,
    practicesLoaded: PropTypes.bool.isRequired,
    loadPracticesError: PropTypes.bool.isRequired,
    loadPractices: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (!this.props.practicesLoaded) this.props.loadPractices();
  }

  render() {
    const styles = require('./BestPracticesContainer.scss');

    if (this.props.loadPracticesError) {
      return (
        <RefreshButton
          label="Reload practices"
          onClick={this.props.loadPractices}
        />
      );
    }

    return (
      <LoadingScreen loading={this.props.loadingPractices}>
        <div className={styles.BestPracticesContainer}>
          {this.props.children}
        </div>
      </LoadingScreen>
    );
  }
}

export default BestPracticesContainer;
