import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _startsWith from 'lodash/startsWith';
import _isNumber from 'lodash/isNumber';
import config from '../../config';
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
    price: '',
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
    // Fetch event's location based on its "place_id"
    const { googleLocationId } = props.eventToEdit;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${googleLocationId}&key=${config.googleMapsKey}`)
      .then((response) => {
        // Display event's data in the form
        const formData = { ...this.state.formData, ...props.eventToEdit };
        formData.location = _get(response, 'data.results[0]', {});
        this.setState({ fetchingEventData: false, formData });
      })
      .catch((error) => {
        // Catch any errors
        this.props.showError({ requestName: 'Load localization', error });
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

  validateForm = () => {
    const { title, link, description, location, date, price } = this.state.formData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    if (!link || link === 'http://') validationErrors.link = 'Link is required';
    if (!(_startsWith(link, 'http://') || _startsWith(link, 'https://'))) validationErrors.link = 'Link must start with "http://"';
    if (!description) validationErrors.description = 'Description is required';
    if (!location) validationErrors.location = 'Location is required';
    if (price && !_isNumber(parseFloat(price))) validationErrors.price = 'Price must be a number';
    if (!date) validationErrors.date = 'Date is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  // Passes edited event back to parent component
  editEvent = () => {
    if (this.validateForm() && !this.props.editingEvent) {
      this.props.editEvent(this.state.formData);
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
