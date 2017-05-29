import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _isEmpty from 'lodash/isEmpty';
import { slate } from 'utils';
// STORE
import { addPractice } from 'redux/modules/practicesModule';
// COMPONENTS
import { PlainTextEditor, RichTextEditor } from 'components';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Div } from 'components/styled';
import styles from './NewPracticePage.scss';

const mappedState = ({ practices }) => ({ addingPractice: practices.addingPractice });

const mappedActions = { addPractice, redirect: push };

@connect(mappedState, mappedActions)
export default class NewPracticePage extends Component {
  static propTypes = {
    addingPractice: PropTypes.bool.isRequired,
    addPractice: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired
  }

  state = {
    newPractice: {
      title: slate.textToState('Title...'),
      content: slate.textToState('Content...')
    },
    validationErrors: {
      title: '',
      content: ''
    }
  }

  // Updates state of the practice
  change = (property) => (value) => {
    const newState = { ...this.state };

    newState.newPractice[property] = value;
    // Hide existing validation error
    if (newState.validationErrors[property] && value) {
      newState.validationErrors[property] = '';
    }

    this.setState(newState);
  }

  // TODO: probably move to to 'utils'? Since it's also used in ArticlePage
  validateArticle = (practiceData) => {
    const { title, content } = practiceData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    if (!content) validationErrors.content = 'Content is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  addPractice = () => {
    const newPractice = { ...this.state.newPractice };

    if (!this.validateArticle(newPractice)) return;

    newPractice.content = slate.stateToObject(this.state.newPractice.content);
    newPractice.plainText = slate.stateToText(this.state.newPractice.content);
    newPractice.title = slate.stateToText(this.state.newPractice.title);

    this.props.addPractice(newPractice);
    if (!this.props.addingPractice) this.props.redirect('/best-practices');
  }

  render() {
    const { addingPractice } = this.props;
    const { newPractice: { title, content }, validationErrors } = this.state;

    return (
      <Div height="100%">
        <Grid>
          <Row>
            <Col xs={12}>
              <Paper className={styles.practiceEditor} zDepth={2}>
                <h3 className={styles.practiceTitle}>
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
                  label={addingPractice ? 'Adding...' : 'Add practice'}
                  primary
                  onClick={this.addPractice}
                />
              </Paper>
            </Col>
          </Row>
        </Grid>
      </Div>
    );
  }
}
