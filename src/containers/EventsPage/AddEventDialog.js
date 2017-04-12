import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _isEmpty from 'lodash/isEmpty';
import _startsWith from 'lodash/startsWith';
import _isNumber from 'lodash/isNumber';
import AddEventForm from './AddEventForm';

const getInitialState = () => ({
  formData: {
    title: '',
    link: 'http://',
    description: '',
    date: new Date(),
    price: '',
    location: {}
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
    eventEdited: PropTypes.bool.isRequired
  }

  static defaultProps = {
    editMode: false,
    dataToEdit: null
  }

  state = getInitialState()

  componentWillReceiveProps(nextProps) {
    // When modal is goind to be opened...
    if (!this.props.popupVisible && nextProps.popupVisible) {
      // If it's edit mode...
      if (nextProps.editMode && nextProps.dataToEdit) {
        // Display event's data in the form

        // TODO: check if it is enough to copy event's data
        this.setState({ formData: { ...nextProps.dataToEdit } });
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

  updateForm = (property, value) => {
    const newState = { ...this.state };

    newState.formData[property] = value;
    // Hide existing validation error
    if (newState.validationErrors[property] && value) {
      newState.validationErrors[property] = '';
    }

    this.setState(newState);
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

  validateForm = () => {
    const { title, link, description, location, date, price } = this.state.formData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    if (!link || link === 'http://') validationErrors.link = 'Link is required';
    if (!(_startsWith(link, 'http://') || _startsWith(link, 'https://'))) validationErrors.link = 'Link must start with "http://"';
    if (!description) validationErrors.description = 'Description is required';
    // TODO: cannot ready description od undefined
    if (!location.description) validationErrors.location = 'Location is required';
    if (price && !_isNumber(parseFloat(price))) validationErrors.price = 'Price must be a number';
    if (!date) validationErrors.date = 'Date is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  render() {
    console.warn('this.props.eventEdited', this.props.eventEdited, this.props);
    const { popupVisible, addingEvent, editingEvent, editMode } = this.props;
    const { formData, validationErrors } = this.state;
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
        <AddEventForm
          formData={formData}
          validationErrors={validationErrors}
          onChange={this.updateForm}
        />
      </Dialog>
    );
  }
}
