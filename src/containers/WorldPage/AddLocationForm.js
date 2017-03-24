import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import LocationInput from './LocationInput';

class AddLocationForm extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    validationErrors: PropTypes.object.isRequired
  }

  render() {
    const {
      formData: { name, link, description },
      validationErrors,
      onChange
    } = this.props;

    return (
      <div>
        <TextField
          floatingLabelText="Name"
          errorText={validationErrors.name}
          value={name}
          onChange={ev => { onChange('name', ev.target.value); }}
          fullWidth
        />
        <TextField
          floatingLabelText="Link"
          errorText={validationErrors.link}
          value={link}
          onChange={ev => { onChange('link', ev.target.value); }}
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

export default AddLocationForm;
