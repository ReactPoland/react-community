import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
// LAYOUT
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import { MockCard } from 'components/mocked';
import { Div } from 'components/styled';
import styles from './HomePage.scss';
// COMPONENTS
import LocationMap from 'containers/WorldPage/LocationMap';
import Poll from './Poll';
import ArticlesGrid from './ArticlesGrid';
import Calendar from './Calendar';

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
            <ArticlesGrid />
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
            <Calendar />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Poll />
          </Col>
          <Col md={4}>
            <MockCard title="Test" content />
          </Col>
          <Col md={4}>
            <MockCard title="Test" content />
          </Col>
        </Row>
      </Grid>
    );
  }
}
