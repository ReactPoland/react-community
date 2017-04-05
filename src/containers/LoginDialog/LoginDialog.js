import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logIn } from 'redux/modules/mapModule';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import _isEmpty from 'lodash/isEmpty';

const getInitialState = () => ({
  formData: {
    name: '',
    password: ''
  },
  validationErrors: {
    name: '',
    password: ''
  }
});

const mappedState = ({ session }) => ({
  loggingIn: session.markers
});

const mappedActions = { logIn };

@connect(mappedState, mappedActions)
class LoginDialog extends Component {
  static propTypes = {
    loggingIn: PropTypes.bool,
    popupVisible: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired
  }

  state = getInitialState()

  /* componentWillReceiveProps(nextProps) {
    // If user successfully logged in, close the dialog
    if (!this.props.markerAdded && nextProps.markerAdded) {
      this.closePopup();
    }
  }*/

  updateForm = (property, value) => {
    const newState = { ...this.state };

    newState.formData[property] = value;
    // Hide existing validation error
    if (newState.validationErrors[property] && value) {
      newState.validationErrors[property] = '';
    }

    this.setState(newState);
  }

  // Passes marker data to parent component if form is valid
  // and no request is pending
  addMarker = () => {
    if (this.validateForm() && !this.props.loggingIn) {
      this.props.logIn(this.state.formData);
    }
  }

  // Clears state and closes dialog window
  closePopup = () => {
    this.setState(getInitialState());
    this.props.closePopup();
  }

  validateForm = () => {
    const { name, password } = this.state.formData;
    const validationErrors = {};

    if (!name) validationErrors.name = 'Name is required';
    if (!password) validationErrors.description = 'Password is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  render() {
    const { popupVisible, loggingIn } = this.props;
    const { formData, validationErrors } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closePopup}
      />,
      <FlatButton
        label={loggingIn ? 'Logging in...' : 'Log in'}
        style={{ marginLeft: 8 }}
        primary
        onTouchTap={this.addMarker}
        disabled={loggingIn}
      />
    ];

    return (
      <Dialog
        contentStyle={{ maxWidth: 500 }}
        titleStyle={{ paddingBottom: 0 }}
        title="Log in"
        actions={actions}
        open={popupVisible}
        onRequestClose={this.closePopup}
      >
        <TextField
          floatingLabelText="Name"
          errorText={validationErrors.name}
          value={formData.name}
          onChange={ev => { this.updateForm('name', ev.target.value); }}
          fullWidth
          autoFocus
        />
        <TextField
          floatingLabelText="Link"
          errorText={validationErrors.password}
          value={formData.password}
          onChange={ev => { this.updateForm('password', ev.target.value); }}
          fullWidth
        />
      </Dialog>
    );
  }
}

export default LoginDialog;
