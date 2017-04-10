import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _first from 'lodash/first';
import _last from 'lodash/last';
import _includes from 'lodash/includes';
import _startsWith from 'lodash/startsWith';
// STORE
import { hideErrorsOfType, hideError, hideAllErrors } from 'redux/modules/errorsModule';
// COMPONENTS
import { ErrorSnackbar } from 'components';

const mappedState = ({ errors }) => ({
  allErrors: errors,
  currentError: _first(errors) || {},
  anyErrors: errors.length > 0,
  firstError: _first(errors) || {},
  lastError: _last(errors) || {}
});

const mappedActions = {
  hideErrorsOfType,
  hideError,
  hideAllErrors
};

@connect(mappedState, mappedActions)
class ErrorHandler extends Component {
  static propTypes = {
    allErrors: PropTypes.array,
    currentError: PropTypes.object,
    anyErrors: PropTypes.bool,
    firstError: PropTypes.object,
    lastError: PropTypes.object,
    hideErrorsOfType: PropTypes.func,
    hideError: PropTypes.func,
    hideAllErrors: PropTypes.func
  }

  onSnackbarClose = () => {
    this.props.hideError();
  }

  errorsOfType = type => this.props.allErrors.filter(err => _startsWith(err.type, type))

  firstErrorOfType = type => this.errorsOfType(type)[0] || {}

  isEmailError = () => _includes(['auth/invalid-email', 'auth/email-already-in-use'], this.props.firstError.type)

  isPasswordError = () => _includes(['auth/wrong-password', 'auth/weak-password'], this.props.firstError.type)

  render() {
    const { message } = this.props.firstError;
    const open = this.props.allErrors.length > 0;

    return (
      <ErrorSnackbar
        open={open}
        message={message}
        onRequestClose={this.onSnackbarClose}
      />
    );
  }
}

export default ErrorHandler;
