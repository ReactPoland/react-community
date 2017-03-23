import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class AddLocalizationForm extends Component {
  static propTypes = {
    value: PropTypes.string
  }

  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  render() {
    const styles = require('./WorldPage.scss');

    return (
      <div className={styles.AddLocalizationForm}>
        <TextField
          hintText="Hint Text"
          floatingLabelText="Fixed Floating Label Text"
          floatingLabelFixed
        />
        <TextField
          hintText="Hint Text"
          floatingLabelText="Fixed Floating Label Text"
          floatingLabelFixed
        />
        <TextField
          hintText="Hint Text"
          floatingLabelText="Fixed Floating Label Text"
          floatingLabelFixed
        />
      </div>
    );
  }
}

export default AddLocalizationForm;
