import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import permission from 'utils/privileges';
// STORE
import { removePractice } from 'redux/modules/practicesModule';
// LAYOUT
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './BestPracticesPage.scss';

const mappedState = ({ practices, auth }) => ({
  bestPractices: practices.all,
  permissions: permission(auth.user)
});

const mappedActions = {
  removePractice,
  redirect: push
};

@connect(mappedState, mappedActions)
export default class BestPracticesPage extends Component {
  static propTypes = {
    bestPractices: PropTypes.array.isRequired,
    removePractice: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired,
    permissions: PropTypes.object.isRequired
  };
  renderRemoveButton = (practiceID) => (
    <IconButton
      onTouchTap={() => this.props.removePractice(practiceID)}
      >
      <ActionDelete
        color={'#e8e8e8'}
        hoverColor={'#f00'}
       />
    </IconButton>
  )
  render() {
    const AddPracticeButton = (
      <FloatingActionButton
        style={{
          position: 'fixed',
          right: 40,
          bottom: 40,
          zIndex: 1000
        }}
        onClick={() => this.props.redirect('/best-practices/add')}
        >
          <ContentAdd />
        </FloatingActionButton>
      );
    const { bestPractices, permissions } = this.props;
    return (
      <Grid className={styles.BestPracticesPage}>
        {AddPracticeButton}
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
                      rightIconButton={permissions.isStaff && this.renderRemoveButton(practice.id)}
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
