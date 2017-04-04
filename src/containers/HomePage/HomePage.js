import React, { Component } from 'react';
import Helmet from 'react-helmet';
// LAYOUT
// TODO: import only necessary components in production
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import styles from './HomePage.scss';
import { MockCard } from 'components/mocked';

export default class HomePage extends Component {
  render() {
    return (
      <Grid className={styles.HomePage}>
        <Helmet title="Home" />
        <Jumbotron>
          <h1>Home</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </Jumbotron>
        <Row>
          <Col md={7}>
            <Row>
              <Col md={6}>
                <MockCard title content />
              </Col>
              <Col md={6}>
                <MockCard title content />
              </Col>
              <Col md={12}>
                <MockCard title content buttons />
              </Col>
              <Col md={12}>
                <MockCard title content buttons />
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            <MockCard image />
            <MockCard title content buttons />
            <MockCard title content buttons />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <MockCard title content buttons />
          </Col>
          <Col md={4}>
            <MockCard title content buttons />
          </Col>
          <Col md={4}>
            <MockCard title content buttons />
          </Col>
        </Row>
      </Grid>
    );
  }
}
