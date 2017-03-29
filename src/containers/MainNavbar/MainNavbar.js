import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class MainNavbar extends Component {
  static propTypes = {
    user: PropTypes.object,
    config: PropTypes.object.isRequired
  }

  render() {
    const { user, config } = this.props;
    const styles = require('./MainNavbar.scss');

    return (
      <Navbar fixedTop>
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
          <Nav navbar>
            {user && <LinkContainer to="/chat">
              <NavItem>Chat</NavItem>
            </LinkContainer>}

            <LinkContainer to="/world">
              <NavItem>World Map</NavItem>
            </LinkContainer>

            <LinkContainer to="/articles">
              <NavItem>Articles</NavItem>
            </LinkContainer>

            <LinkContainer to="/new-article">
              <NavItem>New Article</NavItem>
            </LinkContainer>

            {!user &&
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>}

            {user &&
            <LinkContainer to="/logout">
              <NavItem className="logout-link" onClick={this.handleLogout}>
                Logout
              </NavItem>
            </LinkContainer>}
          </Nav>

          { user &&
          <p className="navbar-text">Logged in as <strong>{user.name}</strong>.</p>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNavbar;
