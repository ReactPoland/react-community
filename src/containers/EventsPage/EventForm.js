import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// COMPONENTS
import { LocationInput } from 'components';
// LAYOUT
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

export default class EventForm extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    validationErrors: PropTypes.object.isRequired
  }

  onLinkFieldFocus = (event) => {
    // Move cursor to the end of the input if it contains
    // default value on focus
    if (this.props.formData.link === 'http://') {
      event.target.value = '';
      event.target.value = this.props.formData.link;
    }
  }

  render() {
    const {
      formData: { title, link, date, description, price, location },
      validationErrors,
      onChange
    } = this.props;

    return (
      <div>
        <TextField
          floatingLabelText="Title"
          errorText={validationErrors.title}
          value={title}
          onChange={ev => { onChange('title', ev.target.value); }}
          fullWidth
          autoFocus
        />
        <DatePicker
          floatingLabelText="Date"
          errorText={validationErrors.date}
          value={moment(date).toDate()}
          onChange={(ev, dt) => { onChange('date', dt); }}
        />
        <TimePicker
          floatingLabelText="Time"
          format="24hr"
          value={moment(date).toDate()}
          onChange={(ev, dt) => { onChange('date', dt); }}
        />
        <TextField
          floatingLabelText="Price"
          errorText={validationErrors.price}
          value={price || 0}
          onChange={ev => { onChange('price', ev.target.value); }}
        />
        <TextField
          floatingLabelText="Link"
          errorText={validationErrors.link}
          value={link}
          onChange={ev => { onChange('link', ev.target.value); }}
          onFocus={this.onLinkFieldFocus}
          fullWidth
        />
        <TextField
          floatingLabelText="Description"
          multiLine
          errorText={validationErrors.description}
          value={description}
          onChange={ev => { onChange('description', ev.target.value); }}
          fullWidth
        />
        <LocationInput
          location={location}
          floatingLabelText="Location"
          errorText={validationErrors.location}
          onChooseLocation={loc => { onChange('location', loc); }}
          fullWidth
        />
      </div>
    );
  }
}
