import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
// LAYOUT
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import { Div } from 'components/styled';
import styles from './HomePage.scss';
// COMPONENTS
import ArticlesGrid from './ArticlesGrid';
import { EventsCalendar, Map } from 'components';

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
              <Div
                flex
                column
                justifyContent="center"
                alignItems="center"
                relative
              >
                <Paper
                  style={{
                    position: 'absolute',
                    margin: 'auto',
                    padding: 16,
                    zIndex: 500
                  }}
                  zDepth={3}
                >
                  Pin yourself
                </Paper>
                <Map static style={{ height: 300, marginBottom: 24 }} />
              </Div>
            </Link>
            <EventsCalendar showEventsList />
          </Col>
        </Row>
      </Grid>
    );
  }
}
