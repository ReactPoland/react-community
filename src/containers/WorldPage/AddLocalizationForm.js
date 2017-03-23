import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class AddLocalizationForm extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const { formData: { name, link, description }, onChange } = this.props;
    const styles = require('./WorldPage.scss');

    return (
      <div className={styles.AddLocalizationForm}>
        <TextField
          floatingLabelText="Name"
          value={name}
          onChange={ev => { onChange('name', ev.target.value); }}
        />
        <TextField
          floatingLabelText="Link"
          value={link}
          onChange={ev => { onChange('link', ev.target.value); }}
        />
        <TextField
          floatingLabelText="Description"
          multiLine
          value={description}
          onChange={ev => { onChange('description', ev.target.value); }}
        />
      </div>
    );
  }
}

export default AddLocalizationForm;
