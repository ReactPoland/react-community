import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// LAYOUT
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { List, ListItem } from 'material-ui/List';
import styles from './BestPracticesPage.scss';

const mappedState = ({ practices }) => ({
  bestPractices: practices.all
});

@connect(mappedState)
export default class BestPracticesPage extends Component {
  static propTypes = {
    bestPractices: PropTypes.array.isRequired
  };
  render() {
    const { bestPractices } = this.props;
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
                bestPractices.map((practice) => (
                  <Link to={`best-practice/${practice.id}`} key={practice.id}>
                    <ListItem
                      primaryText={practice.title}
                    />
                  </Link>
                ))
              }
            </List>
          </Col>
        </Row>
      </Grid>
    );
  }
}
