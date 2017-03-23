import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class AddNewEntryPopup extends Component {
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
        keyboardFocused
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Dialog>
    );
  }
}

AddNewEntryPopup.propTypes = {
  popupVisible: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default AddNewEntryPopup;
