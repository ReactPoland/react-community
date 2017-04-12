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
import AddEventForm from './AddEventForm';
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

const mappedActions = { showError };

@connect(() => ({}), mappedActions)
export default class AddEventDialog extends Component {
  static propTypes = {
    popupVisible: PropTypes.bool.isRequired,
    addEvent: PropTypes.func.isRequired,
    editEvent: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
    addingEvent: PropTypes.bool.isRequired,
    editingEvent: PropTypes.bool.isRequired,
    eventAdded: PropTypes.number,
    editMode: PropTypes.bool,
    dataToEdit: PropTypes.object,
    eventEdited: PropTypes.bool.isRequired,
    showError: PropTypes.func.isRequired
  }

  static defaultProps = {
    editMode: false,
    dataToEdit: null
  }

  state = getInitialState()

  componentWillReceiveProps(nextProps) {
    // When modal is going to be opened...
    if (!this.props.popupVisible && nextProps.popupVisible) {
      // If it's edit mode...
      if (nextProps.editMode && nextProps.dataToEdit) {
        this.prepareEditForm(nextProps);
      }
    }

    // If we successfully got a new event, close the dialog window
    if (!this.props.eventAdded && nextProps.eventAdded) {
      this.closePopup();
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
    const { googleLocationId } = props.dataToEdit;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${googleLocationId}&key=${config.googleMapsKey}`)
      .then((response) => {
        // Display event's data in the form
        const formData = { ...this.state.formData, ...props.dataToEdit };
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

  // Passes event data to parent component if form is valid
  // and no request is pending
  addEvent = () => {
    if (this.validateForm() && !this.props.addingEvent) {
      this.props.addEvent(this.state.formData);
    }
  }

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
    const { popupVisible, addingEvent, editingEvent, editMode } = this.props;
    const { formData, validationErrors, fetchingEventData } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closePopup}
      />,
      !editMode
        ? <FlatButton
          label={addingEvent ? 'Adding...' : 'Add'}
          style={{ marginLeft: 8 }}
          primary
          onTouchTap={this.addEvent}
          disabled={addingEvent}
        />
        : <FlatButton
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
        title={editMode ? 'Editing event' : 'Add new event'}
        actions={actions}
        open={popupVisible}
        onRequestClose={this.closePopup}
      >
        {fetchingEventData && <Spinner
          style={{ position: 'absolute', top: 0, left: 0, background: 'rgba(255, 255, 255, 0.8)', zIndex: 10 }}
        />}
        <AddEventForm
          formData={formData}
          validationErrors={validationErrors}
          onChange={this.updateForm}
        />
      </Dialog>
    );
  }
}
