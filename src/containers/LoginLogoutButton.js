import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout, showLoginSpinner } from 'redux/modules/auth';
import NavItem from 'react-bootstrap/lib/NavItem';
import gitConf from '../../api/utils/github/config';

const mappedState = ({ auth }) => ({
  user: auth.user,
  loggingIn: auth.loggingIn,
  loggingOut: auth.loggingOut
});

@connect(mappedState, { logout, showLoginSpinner })
class LoginLogoutButton extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    loggingOut: PropTypes.bool.isRequired,
    showLoginSpinner: PropTypes.func.isRequired
  }

  logIn = () => {
    this.props.showLoginSpinner();
  }

  logOut = () => {
    this.props.logout();
  }


  render() {
    return this.props.user
      ? <NavItem onClick={this.logOut}>{this.props.loggingOut ? 'Logging out...' : 'Logout'}</NavItem>
      : <NavItem href={gitConf.getAuthLink()} onClick={this.logIn}>{this.props.loggingIn ? 'Logging in...' : 'Log in with GitHub'}</NavItem>;
  }
}

export default LoginLogoutButton;
