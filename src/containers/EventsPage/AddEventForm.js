import React, { Component, PropTypes } from 'react';
// COMPONENTS
import { LocationInput } from 'components';
// LAYOUT
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class AddEventForm extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    validationErrors: PropTypes.object.isRequired
  }

  onLinkFieldFocus = ev => {
    // Move cursor to the end of the input if it contains
    // default value on focus
    if (this.props.formData.link === 'http://') {
      ev.target.value = '';
      ev.target.value = this.props.formData.link;
    }
  }

  render() {
    const {
      formData: { title, link, date, description, price },
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
          value={date}
          onChange={(ev, dt) => { onChange('date', dt); }}
        />
        <TimePicker
          floatingLabelText="Time"
          format="24hr"
          value={date}
          onChange={(ev, dt) => { onChange('date', dt); }}
        />
        <TextField
          floatingLabelText="Price"
          errorText={validationErrors.price}
          value={price}
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
          floatingLabelText="Location"
          errorText={validationErrors.location}
          onChooseLocation={location => { onChange('location', location); }}
          fullWidth
        />
      </div>
    );
  }
}

export default AddEventForm;
