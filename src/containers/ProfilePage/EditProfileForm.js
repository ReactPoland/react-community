import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// LAYOUT
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'components/styled';

const mappedState = ({ auth }) => ({ user: auth.user });

@connect(mappedState)
export default class EditProfileForm extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  state = {
    profile: { ...this.props.user }
  }

  handleChange = (property, value) => {
    this.setState({
      profile: {
        ...this.state.profile,
        [property]: value
      }
    });
  }

  cancelEditing = () => {
    this.props.onCancel();
  }

  submitChanges = () => {
    console.log('submitChanges', this.state.profile);
  }

  render() {
    const fields = [
      { label: 'First name', value: 'firstName' },
      { label: 'Last name', value: 'lastName' },
      { label: 'Email', value: 'email' },
      { label: 'Description', value: 'description' }
    ];

    return (
      <div>
        {
          fields.map((field) => (
            <TextField
              key={field.value}
              floatingLabelText={field.label}
              value={this.state.profile[field.value]}
              onChange={ev => this.handleChange(field.value, ev.target.value)}
            />
          ))
        }
        <List left>
          <RaisedButton
            label="Cancel"
            secondary
            onTouchTap={this.cancelEditing}
          />
          <RaisedButton
            label="Update"
            primary
            onTouchTap={this.submitChanges}
          />
        </List>
      </div>
    );
  }
}
