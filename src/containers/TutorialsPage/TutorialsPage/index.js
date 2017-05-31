import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import permission from 'utils/privileges';
import { push } from 'react-router-redux';
// LAYOUT
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
// import Col from 'react-bootstrap/lib/Col';
// import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './TutorialsPage.scss';
import ProposeTopicDialog from './ProposeTopicDialog';

import TutorialsThumbnails from './TutorialsThumbnails';

import { showProposeDialog, hideProposeDialog, sendPropose } from 'redux/modules/tutorialsModule';

const mappedState = ({ tutorials, auth }) => ({
  tutorials: tutorials,
  permissions: permission(auth.user)
});

const mappedActions = {
  redirect: push,
  showProposeDialog,
  hideProposeDialog,
  sendPropose
};

@connect(mappedState, mappedActions)
export default class TutorialsPage extends Component {
  static propTypes = {
    tutorials: PropTypes.object.isRequired,
    redirect: PropTypes.func.isRequired,
    showProposeDialog: PropTypes.func.isRequired,
    hideProposeDialog: PropTypes.func.isRequired,
    sendPropose: PropTypes.func.isRequired,
    permissions: PropTypes.object.isRequired
  };

  // state = {
    // newProposePopup: null
  // }

  onSelectTutorial = (id) => (ev) => {
    ev.preventDefault();
    if (id === 'newPropose') return this.props.showProposeDialog( true );
    this.props.redirect(`/tutorial/${id}`);
  }

  closePopup = () => this.props.hideProposeDialog()

  proposeSubmit = (title) => {
    this.props.sendPropose(title);
    // console.log('submit');
  }

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

    const copyTutorials = [
      ...tutorials.all, {
        id: 'newPropose',
        title: 'Propose your topic'
      }
    ];

    return (
      <Grid className={styles.TutorialsPage}>
        {permissions.isStaff && AddPracticeButton}
        <Helmet title="Tutorials" />
        <Jumbotron>
          <h1>Tutorials</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </Jumbotron>
        <Row>
          <TutorialsThumbnails
            list={copyTutorials}
            onSelect={this.onSelectTutorial} />
        </Row>
        <ProposeTopicDialog
          open={!!this.props.tutorials.proposeDialog}
          closePopup={this.closePopup}
          onSubmit={this.proposeSubmit} />
      </Grid>
    );
  }
}
