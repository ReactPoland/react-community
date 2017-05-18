import React, { Component } from 'react';
import Helmet from 'react-helmet';
// LAYOUT
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import PropTypes from 'prop-types';
// import Col from 'react-bootstrap/lib/Col';
// import { MockCard } from 'components/mocked';
import styles from './TutorialsPage.scss';

export default class TutorialsPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }

  render() {
    return (
      <Grid className={styles.TutorialsPage}>
        <Helmet title="Tutorials" />
        <Jumbotron>
          <h1>Tutorials</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </Jumbotron>
        <Row>{`Render -> ${this.props.params.splat} <- Detail page`}</Row>
      </Grid>
    );
  }
}
