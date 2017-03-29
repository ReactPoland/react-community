import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Alert from 'react-bootstrap/lib/Alert';
import _isEmpty from 'lodash/isEmpty';
import _startsWith from 'lodash/startsWith';
import AddLocationForm from './AddLocationForm';

const getInitialState = () => ({
  formData: {
    name: '',
    link: 'http://',
    description: '',
    location: {}
  },
  validationErrors: {
    name: '',
    link: '',
    description: '',
    location: ''
  }
});

class AddLocationDialog extends Component {
  static propTypes = {
    popupVisible: PropTypes.bool.isRequired,
    addMarker: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
    addingMarker: PropTypes.bool.isRequired,
    markerAdded: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    clearError: PropTypes.func.isRequired
  }

  state = getInitialState()

  componentWillReceiveProps(nextProps) {
    // If we successfully got a new marker, close the dialog window
    if (!this.props.markerAdded && nextProps.markerAdded) {
      this.closePopup();
    }
  }

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
    if (this.validateForm() && !this.props.addingMarker) {
      this.props.addMarker(this.state.formData);
    }
  }

  // Clears state and closes dialog window
  closePopup = () => {
    this.setState(getInitialState());
    if (this.props.errorMessage) this.props.clearError();
    this.props.closePopup();
  }

  validateForm = () => {
    const { name, link, description, location } = this.state.formData;
    const validationErrors = {};

    if (!name) validationErrors.name = 'Name is required';
    if (!link || link === 'http://') validationErrors.link = 'Link is required';
    if (!(_startsWith(link, 'http://') || _startsWith(link, 'https://'))) validationErrors.link = 'Link must start with "http://"';
    if (!description) validationErrors.description = 'Description is required';
    if (!location.description) validationErrors.location = 'Location is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  render() {
    const { popupVisible, addingMarker, errorMessage } = this.props;
    const { formData, validationErrors } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closePopup}
      />,
      <FlatButton
        label={addingMarker ? 'Adding...' : 'Add'}
        style={{ marginLeft: 8 }}
        primary
        onTouchTap={this.addMarker}
        disabled={addingMarker}
      />
    ];

    return (
      <Dialog
        contentStyle={{ maxWidth: 500 }}
        titleStyle={{ paddingBottom: 0 }}
        title="Add your location"
        actions={actions}
        open={popupVisible}
        onRequestClose={this.closePopup}
      >
        <AddLocationForm
          formData={formData}
          validationErrors={validationErrors}
          onChange={this.updateForm}
        />
        {
          errorMessage &&
            <Alert bsStyle="danger" style={{ margin: '20px 0 -20px' }}>
              <strong>{errorMessage}</strong>
            </Alert>
        }
      </Dialog>
    );
  }
}

export default AddLocationDialog;
