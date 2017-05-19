import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout, login } from 'redux/modules/auth';
import NavItem from 'react-bootstrap/lib/NavItem';
import { gitAuthLink } from '../utils';

const mappedState = ({ auth }) => ({
  user: auth.user,
  loggingIn: auth.loggingIn,
  loggingOut: auth.loggingOut
});

@connect(mappedState, { logout, login })
class LoginLogoutButton extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    loggingOut: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
  }

  logIn = () => {
    this.props.login();
  }

  logOut = () => {
    this.props.logout();
  }


  render() {
    return this.props.user
      ? <NavItem onClick={this.logOut}>{this.props.loggingOut ? 'Logging out...' : 'Logout'}</NavItem>
      : <NavItem href={gitAuthLink()} onClick={this.logIn}>{this.props.loggingIn ? 'Logging in...' : 'Log in with GitHub'}</NavItem>;
  }
}

export default LoginLogoutButton;
