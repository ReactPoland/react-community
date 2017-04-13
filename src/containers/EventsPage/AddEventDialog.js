import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventFormValidator } from 'utils';
// STORE
import { showError } from 'redux/modules/errorsModule';
// COMPONENTS
import EventForm from './EventForm';
// LAYOUT
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const getInitialState = () => ({
  formData: {
    title: '',
    link: 'http://',
    description: '',
    date: new Date(),
    price: '0.00',
    location: null
  },
  validationErrors: {
    title: '',
    link: '',
    description: '',
    price: '',
    date: '',
    location: ''
  }
});

const mappedState = ({ events }) => ({
  addingEvent: events.addingEvent,
  eventAdded: events.eventAdded
});

const mappedActions = { showError };

@connect(mappedState, mappedActions)
export default class AddEventDialog extends Component {
  static propTypes = {
    popupVisible: PropTypes.bool.isRequired,
    closePopup: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
    addingEvent: PropTypes.bool.isRequired,
    eventAdded: PropTypes.number,
    showError: PropTypes.func.isRequired
  }

  state = getInitialState()

  componentWillReceiveProps(nextProps) {
    // If we successfully got a new event, close the dialog window
    if (!this.props.eventAdded && nextProps.eventAdded) {
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

  // Passes new event's data back to parent component
  addEvent = () => {
    const { isValid, errors } = eventFormValidator(this.state.formData);
    if (isValid && !this.props.addingEvent) {
      this.props.addEvent(this.state.formData);
    } else {
      this.setState({ validationErrors: errors });
    }
  }

  // Clears state and closes dialog window
  closePopup = () => {
    this.setState(getInitialState());
    this.props.closePopup();
  }

  render() {
    const { popupVisible, addingEvent } = this.props;
    const { formData, validationErrors } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closePopup}
      />,
      <FlatButton
        label={addingEvent ? 'Adding...' : 'Add'}
        style={{ marginLeft: 8 }}
        primary
        onTouchTap={this.addEvent}
        disabled={addingEvent}
      />
    ];

    return (
      <Dialog
        contentStyle={{ maxWidth: 500 }}
        titleStyle={{ paddingBottom: 0 }}
        title="Add new event"
        actions={actions}
        open={popupVisible}
        onRequestClose={this.closePopup}
      >
        <EventForm
          formData={formData}
          validationErrors={validationErrors}
          onChange={this.updateForm}
        />
      </Dialog>
    );
  }
}
