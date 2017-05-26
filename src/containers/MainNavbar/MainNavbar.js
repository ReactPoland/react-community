import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import config from '../../config';
import permission from 'utils/privileges';
// STORE
import { openDialog } from 'redux/modules/dialogModule';
// COMPONENTS
import LoginLogoutButton from 'containers/LoginLogoutButton';
// LAYOUT
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Avatar from 'material-ui/Avatar';
import styles from './MainNavbar.scss';

const mappedState = ({ auth }) => ({
  user: auth.user
});

@connect(mappedState, { openDialog })
export default class MainNavbar extends Component {
  static propTypes = {
    user: PropTypes.object,
    openDialog: PropTypes.func.isRequired
  }

  render() {
    const { user } = this.props;

    return (
      <Navbar fixedTop className={styles.MainNavbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/" activeStyle={{ color: '#33e0ff' }}>
              <div className={styles.brand} />
              <span>{config.app.title}</span>
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav navbar pullRight>
            <LinkContainer to="/best-practices">
              <NavItem>Best Practices</NavItem>
            </LinkContainer>

            <LinkContainer to="/tutorials">
              <NavItem>Tutorials</NavItem>
            </LinkContainer>

            {
              permission(user).isStaff
              &&
                (<LinkContainer to="/articles">
                  <NavItem>Articles</NavItem>
                </LinkContainer>)
            }

            <LinkContainer to="/events">
              <NavItem>Events</NavItem>
            </LinkContainer>

            <LinkContainer to="/quizzes">
              <NavItem>Test</NavItem>
            </LinkContainer>

            <LinkContainer to="/users">
              <NavItem>Users</NavItem>
            </LinkContainer>

            <LoginLogoutButton />

            {user && <LinkContainer to="/profile">
              <NavItem><Avatar size={20} src={user.pictureURL} /></NavItem>
            </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
