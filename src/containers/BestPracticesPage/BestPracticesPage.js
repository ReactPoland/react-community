import React, { Component } from 'react';
import Helmet from 'react-helmet';
// LAYOUT
// TODO: import only necessary components in production
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import { List, ListItem } from 'material-ui/List';
import styles from './BestPracticesPage.scss';

const bestPractices = [
  { id: 0, name: 'Starting your React project' },
  { id: 1, name: 'Handling async data' },
  { id: 2, name: 'Inline styles vs CSS' },
  { id: 3, name: 'UI Framework' },
  { id: 4, name: 'State vs Props' },
  { id: 5, name: 'Multiple layouts' },
  { id: 6, name: 'API data store format' },
  { id: 7, name: 'Modal views' },
  { id: 8, name: 'Notifications' },
  { id: 9, name: 'Data immutability in Redux' },
  { id: 10, name: 'How to handle different user roles' }
];

export default class BestPracticesPage extends Component {
  render() {
    return (
      <Grid className={styles.BestPracticesPage}>
        <Helmet title="Best Practices" />
        <Jumbotron>
          <h1>Best Practices</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </Jumbotron>
        <Row>
          <Col md={6} mdOffset={3}>
            <List>
              {
                bestPractices.map(({ id, name }) => (
                  <ListItem
                    key={id}
                    primaryText={name}
                  />
                ))
              }
            </List>
          </Col>
        </Row>
      </Grid>
    );
  }
}
