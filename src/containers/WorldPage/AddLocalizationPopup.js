import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddLocalizationForm from './AddLocalizationForm';

class AddLocalizationPopup extends Component {
  static propTypes = {
    popupVisible: PropTypes.bool.isRequired,
    closePopup: PropTypes.func.isRequired,
  }

  render() {
    const { popupVisible, closePopup } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={closePopup}
      />,
      <FlatButton
        label="Add"
        primary
        onTouchTap={closePopup}
      />
    ];

    return (
      <Dialog
        title="Add your location"
        actions={actions}
        modal={false}
        open={popupVisible}
        onRequestClose={closePopup}
      >
        <AddLocalizationForm />
      </Dialog>
    );
  }
}

export default AddLocalizationPopup;
