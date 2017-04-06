import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
// LAYOUT
// TODO: import only necessary components in production
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import styles from './HomePage.scss';
import { MockCard } from 'components/mocked';
import { Div } from 'components/styled';
import LocationMap from 'containers/WorldPage/LocationMap';

export default class HomePage extends Component {
  render() {
    return (
      <Grid className={styles.HomePage}>
        <Helmet title="Home" />
        <Jumbotron>
          <h1>React Community</h1>
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
            <Link to="/world">
              <Div flex column justifyContent="center" alignItems="center" relative>
                <Paper style={{ position: 'absolute', margin: 'auto', padding: 16, zIndex: 500 }} zDepth={3}>
                  Pin yourself
                </Paper>
                <LocationMap static style={{ height: 300, marginBottom: 24 }} />
              </Div>
            </Link>
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
