import React, { Component } from 'react';
import Helmet from 'react-helmet';
// LAYOUT
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import ActionWork from 'material-ui/svg-icons/action/work';
import ActionBook from 'material-ui/svg-icons/action/book';
import ActionTrackChanges from 'material-ui/svg-icons/action/track-changes';
import HardwarePhoneIphone from 'material-ui/svg-icons/hardware/phone-iphone';
import SocialPublic from 'material-ui/svg-icons/social/public';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './TutorialsPage.scss';

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
            <Paper zDepth={1} className={styles['TutorialsPage-card']}>
              <ActionWork style={{ width: '15rem', height: '15rem' }} />
              <h3 className={styles['TutorialsPage-card-title']}>Recommended Learning Resources</h3>
            </Paper>
          </Col>
          <Col md={6}>
            <Paper zDepth={1} className={styles['TutorialsPage-card']}>
              <ActionBook style={{ width: '15rem', height: '15rem' }} />
              <h3 className={styles['TutorialsPage-card-title']}>Recommended Books</h3>
            </Paper>
          </Col>
          <Col md={6}>
            <Paper zDepth={1} className={styles['TutorialsPage-card']}>
              <ActionTrackChanges style={{ width: '15rem', height: '15rem' }} />
              <h3 className={styles['TutorialsPage-card-title']}>React, Redux - the Right Way</h3>
            </Paper>
          </Col>
          <Col md={6}>
            <Paper zDepth={1} className={styles['TutorialsPage-card']}>
              <HardwarePhoneIphone style={{ width: '15rem', height: '15rem' }} />
              <h3 className={styles['TutorialsPage-card-title']}>Migration first React Native Apps</h3>
            </Paper>
          </Col>
          <Col md={6}>
            <Paper zDepth={1} className={styles['TutorialsPage-card']}>
              <SocialPublic style={{ width: '15rem', height: '15rem' }} />
              <h3 className={styles['TutorialsPage-card-title']}>Exploring GraphQL</h3>
            </Paper>
          </Col>
          <Col md={6}>
            <Paper zDepth={1} className={styles['TutorialsPage-card']}>
              <ContentAdd style={{ width: '15rem', height: '15rem' }} />
              <h3 className={styles['TutorialsPage-card-title']}>Propose your topic</h3>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
