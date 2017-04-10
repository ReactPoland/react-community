import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';

class Poll extends Component {
  state = {
    value: ''
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleSubmit = () => {
    if (!this.state.value) return;

    alert(`You chose "${this.state.value}"`);
  }

  render() {
    return (
      <Card>
        <CardTitle title="Poll" />
        <CardText>
          <RadioButtonGroup name="sample" onChange={this.handleChange}>
            <RadioButton
              value="Option 1"
              label="Option 1"
              style={{ marginBottom: 16 }}
            />
            <RadioButton
              value="Option 2"
              label="Option 2"
              style={{ marginBottom: 16 }}
            />
            <RadioButton
              value="Option 3"
              label="Option 3"
            />
          </RadioButtonGroup>
        </CardText>
        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FlatButton
            onClick={this.handleSubmit}
            disabled={!this.state.value}
            label="Submit"
          />
        </CardActions>
      </Card>
    );
  }
}

export default Poll;
