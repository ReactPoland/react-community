import React, { Component } from 'react';
import Helmet from 'react-helmet';
// LAYOUT
// TODO: import only necessary components in production
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import styles from './TutorialsPage.scss';
import { MockCard } from 'components/mocked';

export default class TutorialsPage extends Component {
  render() {
    return (
      <Grid className={styles.TutorialsPage}>
        <Helmet title="Tutorials" />
        <Jumbotron>
          <h1>Tutorials</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </Jumbotron>
        <Row>
          <Col md={6}>
            <MockCard image />
          </Col>
          <Col md={6}>
            <MockCard image />
          </Col>
          <Col md={6}>
            <MockCard image />
          </Col>
          <Col md={6}>
            <MockCard image />
          </Col>
          <Col md={6}>
            <MockCard image />
          </Col>
          <Col md={6}>
            <MockCard image />
          </Col>
        </Row>
      </Grid>
    );
  }
}
