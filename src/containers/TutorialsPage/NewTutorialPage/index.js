import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _isEmpty from 'lodash/isEmpty';
import { slate } from 'utils';
// STORE
import { addTutorial } from 'redux/modules/tutorialsModule';
// COMPONENTS
import { PlainTextEditor, RichTextEditor } from 'components';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Div } from 'components/styled';
import styles from './NewTutorialPage.scss';

const mappedState = ({ tutorials }) => ({ addingTutorial: tutorials.addingTutorial });

const mappedActions = { addTutorial, redirect: push };

@connect(mappedState, mappedActions)
export default class NewTutorialPage extends Component {
  static propTypes = {
    addingTutorial: PropTypes.bool.isRequired,
    addTutorial: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired
  }

  state = {
    newTutorial: {
      title: slate.textToState('Title...'),
      content: slate.textToState('Content...')
    },
    validationErrors: {
      title: '',
      content: ''
    }
  }

  // Updates state of the tutorial
  change = (property) => (value) => {
    const newState = { ...this.state };

    newState.newTutorial[property] = value;
    // Hide existing validation error
    if (newState.validationErrors[property] && value) {
      newState.validationErrors[property] = '';
    }

    this.setState(newState);
  }

  // TODO: probably move to to 'utils'? Since it's also used in TutorialPage
  validateArticle = (tutorialData) => {
    const { title, content } = tutorialData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    if (!content) validationErrors.content = 'Content is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  addTutorial = () => {
    const newTutorial = { ...this.state.newTutorial };

    if (!this.validateArticle(newTutorial)) return;

    newTutorial.content = slate.stateToObject(this.state.newTutorial.content);
    newTutorial.plainText = slate.stateToText(this.state.newTutorial.content);
    newTutorial.title = slate.stateToText(this.state.newTutorial.title);

    this.props.addTutorial(newTutorial);
    if (!this.props.addingTutorial) this.props.redirect('/tutorials');
  }

  render() {
    const { addingTutorial } = this.props;
    const { newTutorial: { title, content }, validationErrors } = this.state;

    return (
      <Div height="100%">
        <Grid>
          <Row>
            <Col xs={12}>
              <Paper className={styles.tutorialEditor} zDepth={2}>
                <h3 className={styles.tutorialTitle}>
                  <PlainTextEditor
                    initialState={title}
                    onChange={this.change('title')}
                    placeholder="Title"
                  />
                </h3>
                {validationErrors.title && <p>{validationErrors.title}</p>}
                <RichTextEditor
                  initialState={content}
                  style={{ width: '100%', height: '100vh', maxHeight: '45vh' }}
                  onChange={this.change('content')}
                  placeholder="Content"
                />
                {validationErrors.content && <p>{validationErrors.content}</p>}
                <FlatButton
                  label={addingTutorial ? 'Adding...' : 'Add tutorial'}
                  primary
                  onClick={this.addTutorial}
                />
              </Paper>
            </Col>
          </Row>
        </Grid>
      </Div>
    );
  }
}
