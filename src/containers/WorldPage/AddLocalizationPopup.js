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

  constructor() {
    super();

    this.state = {
      formData: {
        name: '',
        link: '',
        description: ''
      }
    };
  }

  updateForm = (property, value) => {
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [property]: value
      }
    });
  }

  closePopup = () => {
    this.setState({ formData: {} });
    this.props.closePopup();
  }

  addMarker = () => {
    this.props.addMarker(this.state.formData);
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
