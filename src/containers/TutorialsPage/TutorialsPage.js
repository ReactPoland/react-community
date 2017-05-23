import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import permission from 'utils/privileges';
import { push } from 'react-router-redux';
// LAYOUT
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionTrackChanges from 'material-ui/svg-icons/action/track-changes';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './TutorialsPage.scss';

const mappedState = ({ tutorials, auth }) => ({
  tutorials: tutorials.all,
  permissions: permission(auth.user)
});

const mappedActions = {
  redirect: push
};

@connect(mappedState, mappedActions)
export default class TutorialsPage extends Component {
  static propTypes = {
    tutorials: PropTypes.array.isRequired,
    redirect: PropTypes.func.isRequired,
    permissions: PropTypes.object.isRequired
  };
  render() {
    const { permissions, tutorials } = this.props;
    const AddPracticeButton = (
      <FloatingActionButton
        style={{
          position: 'fixed',
          right: 40,
          bottom: 40,
          zIndex: 1000
        }}
        onClick={() => this.props.redirect('/tutorials/add')}
        >
          <ContentAdd />
        </FloatingActionButton>
      );
    const tutorialList = tutorials.map(tutorial => (
        <Col md={6} key={tutorial.id}>
          <Link to={`/tutorial/${tutorial.id}`}>
            <Paper zDepth={1} className={styles['TutorialsPage-card']}>
              <ActionTrackChanges style={{ width: '15rem', height: '15rem' }} />
              <h3 className={styles['TutorialsPage-card-title']}>{tutorial.title}</h3>
            </Paper>
          </Link>
        </Col>
      ));
    return (
      <Grid className={styles.TutorialsPage}>
        {permissions.isStaff && AddPracticeButton}
        <Helmet title="Tutorials" />
        <Jumbotron>
          <h1>Tutorials</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </Jumbotron>
        <Row>
          {tutorialList}
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
