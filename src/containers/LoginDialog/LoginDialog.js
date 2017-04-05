import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

const mappedState = ({ auth }) => ({
  loggingIn: auth.loggingIn
});

const mappedActions = {};

@connect(mappedState, mappedActions)
class LoginDialog extends Component {
  static propTypes = {
    loggingIn: PropTypes.bool,
    dialogOpened: PropTypes.bool.isRequired,
    logIn: PropTypes.func,
    closeDialog: PropTypes.func.isRequired
  }

  state = getInitialState()

  /* componentWillReceiveProps(nextProps) {
    // If user successfully logged in, close the dialog
    if (!this.props.markerAdded && nextProps.markerAdded) {
      this.closeDialog();
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
  logIn = () => {
    if (this.validateForm() && !this.props.loggingIn) {
      console.log('login');
      // this.props.logIn(this.state.formData);
    }
  }

  // Clears state and closes dialog window
  closeDialog = () => {
    this.props.closeDialog();
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
    const { dialogOpened, loggingIn } = this.props;
    const { formData, validationErrors } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closeDialog}
      />,
      <FlatButton
        label={loggingIn ? 'Logging in...' : 'Log in'}
        style={{ marginLeft: 8 }}
        primary
        onTouchTap={this.logIn}
        disabled={loggingIn}
      />
    ];

    return (
      <Dialog
        contentStyle={{ maxWidth: 500 }}
        titleStyle={{ paddingBottom: 0 }}
        title="Log in"
        actions={actions}
        open={dialogOpened}
        onRequestClose={this.closeDialog}
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
