import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventFormValidator } from 'utils';
// STORE
import { showError } from 'redux/modules/errorsModule';
// COMPONENTS
import { Spinner } from 'components';
import EventForm from './EventForm';
// LAYOUT
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const getInitialState = () => ({
  fetchingEventData: false,
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

const mappedState = ({ events }, props) => ({
  eventToEdit: events.all.find(event => event.id === props.eventId),
  editingEvent: events.editingEvent,
  eventEdited: events.eventEdited
});

const mappedActions = { showError };

@connect(mappedState, mappedActions)
export default class EditEventDialog extends Component {
  static propTypes = {
    eventId: PropTypes.number,
    eventToEdit: PropTypes.object,
    editEvent: PropTypes.func.isRequired,
    editingEvent: PropTypes.bool.isRequired,
    eventEdited: PropTypes.bool.isRequired,
    popupVisible: PropTypes.bool.isRequired,
    closePopup: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired
  }

  static defaultProps = {
    eventToEdit: {}
  }

  state = getInitialState()

  componentDidMount() {
    // Initializes Google Maps code
    const { google } = window;
    this.geocoder = new google.maps.Geocoder;
  }

  componentWillReceiveProps(nextProps) {
    // When modal is going to be opened...
    if (!this.props.popupVisible && nextProps.popupVisible) {
      this.prepareEditForm(nextProps);
    }

    // If we successfully edited an event, close the dialog window
    if (!this.props.eventEdited && nextProps.eventEdited) {
      this.closePopup();
    }
  }

  prepareEditForm = (props) => {
    // Show spinner
    this.setState({ fetchingEventData: true });
    const { googleLocationId } = props.eventToEdit;
    // Fetch event's location based on its "place_id"
    this.geocoder.geocode({ placeId: googleLocationId }, results => {
      // Display event's data in the form
      const formData = { ...this.state.formData, ...props.eventToEdit };
      formData.location = results[0];
      this.setState({ fetchingEventData: false, formData });
    });
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

  // Passes edited event back to parent component
  editEvent = () => {
    const { isValid, errors } = eventFormValidator(this.state.formData);
    if (isValid && !this.props.editingEvent) {
      this.props.editEvent(this.state.formData);
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
    const { popupVisible, editingEvent } = this.props;
    const { formData, validationErrors, fetchingEventData } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closePopup}
      />,
      <FlatButton
        label={editingEvent ? 'Editing...' : 'Edit'}
        style={{ marginLeft: 8 }}
        primary
        onTouchTap={this.editEvent}
        disabled={editingEvent}
      />
    ];

    return (
      <Dialog
        contentStyle={{ maxWidth: 500 }}
        titleStyle={{ paddingBottom: 0 }}
        title="Editing event"
        actions={actions}
        open={popupVisible}
        onRequestClose={this.closePopup}
      >
        {fetchingEventData && <Spinner
          style={{ position: 'absolute', top: 0, left: 0, background: 'rgba(255, 255, 255, 0.8)', zIndex: 10 }}
        />}
        <EventForm
          formData={formData}
          validationErrors={validationErrors}
          onChange={this.updateForm}
        />
      </Dialog>
    );
  }
}
