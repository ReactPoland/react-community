import React, { Component } from 'react';
import { Flex } from 'components/styled';
import { LinkContainer } from 'react-router-bootstrap';
import NavItem from 'react-bootstrap/lib/NavItem';
import styles from './MainFooter.scss';

class MainFooter extends Component {
  render() {
    return (
      <Flex
        column
        justifyContent="center"
        alignItems="center"
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
      </Flex>
    );
  }
}

export default MainFooter;
