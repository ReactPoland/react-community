import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// STORE
import { loadTutorials } from 'redux/modules/tutorialsModule';
// COMPONENTS
import { LoadingScreen, RefreshButton } from 'components';

const mappedState = ({ tutorials }) => ({
  loadingTutorials: tutorials.loadingTutorials,
  tutorialsLoaded: tutorials.tutorialsLoaded,
  loadTutorialsError: tutorials.loadTutorialsError
});

const mappedActions = { loadTutorials };

@connect(mappedState, mappedActions)
class TutorialsContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.object.isRequired,
    loadingTutorials: PropTypes.bool.isRequired,
    tutorialsLoaded: PropTypes.bool.isRequired,
    loadTutorialsError: PropTypes.bool.isRequired,
    loadTutorials: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (!this.props.tutorialsLoaded) this.props.loadTutorials();
  }

  render() {
    const styles = require('./TutorialsContainer.scss');

    if (this.props.loadTutorialsError) {
      return (
        <RefreshButton
          label="Reload tutorials"
          onClick={this.props.loadTutorials}
        />
      );
    }

    return (
      <LoadingScreen loading={this.props.loadingTutorials}>
        <div className={styles.TutorialsContainer}>
          {this.props.children}
        </div>
      </LoadingScreen>
    );
  }
}

export default TutorialsContainer;
