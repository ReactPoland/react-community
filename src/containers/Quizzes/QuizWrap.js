import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadingScreen, RefreshButton } from 'components';

class QuizWrap extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    loadAction: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (!this.props.loading && !this.props.loaded) this.props.loadAction();
  }

  wasLoadFailed = () => (!this.props.loading && !this.props.loaded)

  render() {
    if (this.wasLoadFailed()) {
      return (
        <RefreshButton
          label="Reload"
          onClick={this.props.loadAction}
        />
      );
    }

    return (
      <LoadingScreen loading={this.props.loading} >
        {this.props.children}
      </LoadingScreen>
    );
  }
}

export default QuizWrap;
