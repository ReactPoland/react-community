import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { eventFormValidator } from 'utils';
// COMPONENTS
// import { Spinner } from 'components';
import EventForm from './EventForm';
// LAYOUT
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ViewEventDialog extends Component {
  static propTypes = {
    event: PropTypes.object,
    open: PropTypes.bool.isRequired,
    closePopup: PropTypes.func.isRequired
  }

  // Clears state and closes dialog window
  closePopup = () => {
    this.props.closePopup();
  }

  render() {
    const { open, event } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closePopup}
      />
    ];

    console.log(open, event);

    return (
      <Dialog
        contentStyle={{ maxWidth: 500 }}
        titleStyle={{ paddingBottom: 0 }}
        title="View event"
        actions={actions}
        open={open}
        onRequestClose={this.closePopup}
        autoScrollBodyContent >

        {open && (
          <EventForm isViewing formData={event} />
        )}

      </Dialog>
    );
  }
}
