import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// STORE
import { editProfile } from 'redux/modules/auth';
// LAYOUT
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Div, List } from 'components/styled';

const mappedState = ({ auth }) => ({
  user: auth.user,
  editingProfile: auth.editingProfile
});

const mappedActions = { editProfile };

@connect(mappedState, mappedActions)
export default class EditProfileForm extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    editingProfile: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired
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

  submitChanges = (ev) => {
    ev.preventDefault();
    this.props.editProfile(this.state.profile);
  }

  render() {
    const fields = [
      { label: 'First name', value: 'firstName' },
      { label: 'Last name', value: 'lastName' },
      { label: 'Picture URL', value: 'pictureURL' }
    ];

    return (
      <Div noPointerEvents={this.props.editingProfile}>
        <form onSubmit={this.submitChanges}>
          {fields.map(({ label, value }) =>
            <TextField
              key={value}
              floatingLabelText={label}
              value={this.state.profile[value]}
              onChange={ev => this.handleChange(value, ev.target.value)}
            />
          )}
          <List left>
            <RaisedButton
              label="Cancel"
              type="button"
              secondary
              onTouchTap={this.cancelEditing}
            />
            <RaisedButton
              label={this.props.editingProfile ? 'Updating...' : 'Update'}
              type="submit"
              primary
            />
          </List>
        </form>
      </Div>
    );
  }
}
