import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddLocalizationForm from './AddLocalizationForm';

class AddLocalizationPopup extends Component {
  static propTypes = {
    popupVisible: PropTypes.bool.isRequired,
    addMarker: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
  }

  state = {
    formData: {
      name: '',
      link: '',
      description: '',
      location: {}
    }
  }

  updateForm = (property, value) => {
    const newState = { ...this.state };
    newState.formData[property] = value;
    console.info('Form updated', newState.formData);
    this.setState(newState);
  }

  addMarker = () => {
    this.props.addMarker(this.state.formData);
    this.closePopup();
  }

  closePopup = () => {
    this.setState({ formData: {} });
    this.props.closePopup();
  }

  render() {
    const { popupVisible } = this.props;
    const { formData } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closePopup}
      />,
      <FlatButton
        label="Add"
        primary
        onTouchTap={this.addMarker}
      />
    ];

    return (
      <Dialog
        title="Add your location"
        actions={actions}
        modal={false}
        open={popupVisible}
        onRequestClose={this.closePopup}
      >
        <AddLocalizationForm
          formData={formData}
          onChange={this.updateForm}
        />
      </Dialog>
    );
  }
}

export default AddLocalizationPopup;
