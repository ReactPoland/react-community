import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { openDialog } from 'redux/modules/dialogModule';
import { LinkContainer } from 'react-router-bootstrap';
import LoginLogoutButton from 'containers/LoginLogoutButton';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

@connect(() => ({}), { openDialog })
class MainNavbar extends Component {
  static propTypes = {
    user: PropTypes.object,
    config: PropTypes.object.isRequired,
    openDialog: PropTypes.func.isRequired
  }

  render() {
    const { user, config } = this.props;
    const styles = require('./MainNavbar.scss');

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
            <LinkContainer to="/world">
              <NavItem>World Map</NavItem>
            </LinkContainer>

            <LinkContainer to="/best-practices">
              <NavItem>Best Practices</NavItem>
            </LinkContainer>

            <LinkContainer to="/tutorials">
              <NavItem>Tutorials</NavItem>
            </LinkContainer>

            <LinkContainer to="/articles">
              <NavItem>Articles</NavItem>
            </LinkContainer>

            <LoginLogoutButton />
          </Nav>

          {user && <p className="navbar-text">Logged in as <strong>{user.firstName}</strong>.</p>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNavbar;
