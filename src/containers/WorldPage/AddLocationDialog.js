import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _isEmpty from 'lodash/isEmpty';
import AddLocationForm from './AddLocationForm';

const initialState = {
  formData: {
    name: '',
    link: '',
    description: '',
    location: {}
  },
  validationErrors: {}
};

class AddLocationDialog extends Component {
  static propTypes = {
    popupVisible: PropTypes.bool.isRequired,
    addMarker: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
  }

  state = { ...initialState }

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
  addMarker = () => {
    if (this.validateForm()) {
      this.props.addMarker(this.state.formData);
      this.closePopup();
    }
  }

  // Clears state and closes dialog window
  closePopup = () => {
    this.setState(initialState);
    this.props.closePopup();
  }

  validateForm = () => {
    const { name, link, description, location } = this.state.formData;
    const validationErrors = {};

    if (!name) validationErrors.name = 'Name is required';
    if (!link) validationErrors.link = 'Link is required';
    if (!description) validationErrors.description = 'Description is required';
    if (!location.description) validationErrors.location = 'Location is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  render() {
    const { popupVisible } = this.props;
    const { formData, validationErrors } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closePopup}
      />,
      <FlatButton
        label="Add"
        style={{ marginLeft: 8 }}
        primary
        onTouchTap={this.addMarker}
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
      </Dialog>
    );
  }
}

export default AddLocationDialog;
