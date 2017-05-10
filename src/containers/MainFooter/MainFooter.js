import React, { Component } from 'react';
import { Div } from 'components/styled';
import { LinkContainer } from 'react-router-bootstrap';
import NavItem from 'react-bootstrap/lib/NavItem';
import styles from './MainFooter.scss';

class MainFooter extends Component {
  render() {
    return (
      <Div
        flex
        column
        justifyContent="center"
        alignItems="center"
        flexNone
        className={styles.MainFooter}
      >
        <ul>
          <LinkContainer to="/articles">
            <NavItem>Site Map</NavItem>
          </LinkContainer>
          <LinkContainer to="/articles">
            <NavItem>Contact</NavItem>
          </LinkContainer>
          <LinkContainer to="/articles">
            <NavItem>About</NavItem>
          </LinkContainer>
        </ul>
        <p>React Poland 2017</p>
      </Div>
    );
  }
}

export default MainFooter;
