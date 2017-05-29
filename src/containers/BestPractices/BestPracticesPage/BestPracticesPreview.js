import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import { slate } from 'utils';
import permission from 'utils/privileges';
// STORE
import { editPractice } from 'redux/modules/practicesModule';
// LAYOUT
import styles from './BestPracticesPreview.scss';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { PlainTextEditor, RichTextEditor } from 'components';
import Paper from 'material-ui/Paper';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const mappedState = ({ practices, auth }, props) => ({
  practice: _find(practices.all, pract => props.params.id === `${pract.id}`),
  editingPractice: practices.editingPractice,
  practiceEdited: practices.practiceEdited,
  removingPractice: practices.removingPractice,
  permissions: permission(auth.user)
});
const mappedActions = {
  editPractice
};
@connect(mappedState, mappedActions)
export default class BestPracticesPreview extends Component {
  static propTypes = {
    practice: PropTypes.object,
    params: PropTypes.object.isRequired,
    practiceEdited: PropTypes.bool,
    editPractice: PropTypes.func.isRequired,
    permissions: PropTypes.object.isRequired
  }
  state = {
    editingMode: false,
    practice: this.preparePractice(this.props.practice),
    validationErrors: {
      content: '',
      text: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    const { practice = {} } = nextProps;
    // When article was successfully updated...
    if (nextProps.practiceEdited !== this.props.practiceEdited) {
      this.setState({
        editingMode: false,
        practice: this.preparePractice(practice)
      });
    }
  }

  // Prepares article content to use Slate's state objects
  preparePractice(practice) {
    if (!practice) return {};

    return {
      ...practice,
      content: _isEmpty(practice.content) ? {} : slate.objectToState(practice.content),
      title: slate.textToState(practice.title)
    };
  }
  // Updates state of the practice
  change = (property) => (value) => {
    const practice = { ...this.state.practice };
    const validationErrors = { ...this.state.validationErrors };

    // Update practice
    practice[property] = value;
    // Hide existing validation error
    if (validationErrors[property] && value) validationErrors[property] = '';

    this.setState({ practice, validationErrors });
  }
  validatePractice = (practiceData) => {
    const { title } = practiceData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  saveEditButtonActions = () => {
    const { practice } = { ...this.state };
    if (!this.validatePractice(practice)) return;
    if (this.state.editingMode) {
      if (!_isEmpty(practice.content)) practice.content = slate.stateToObject(practice.content);
      if (!_isEmpty(practice.plainText)) practice.plainText = slate.stateToText(practice.content);
      if (!_isEmpty(practice.title)) practice.title = slate.stateToText(practice.title);
      this.props.editPractice(practice);
      this.setState({ editingMode: !this.state.editingMode });
    } else {
      this.setState({ editingMode: !this.state.editingMode });
    }
  }
  renderSaveEditButton = () => {
    return (
      <FlatButton
        style={{ margin: 0 }}
        label={this.state.editingMode ? 'Save' : 'Edit'}
        primary
        onClick={() => this.saveEditButtonActions()}
      />
    );
  }
  renderTitleEditor = () => (
    <PlainTextEditor
      initialState={this.state.practice.title}
      onChange={this.change('title')}
      readOnly={!this.state.editingMode}
      style={{ fontSize: 20 }}
    />
  )
  renderContentEditor = () => (
    <RichTextEditor
      initialState={this.state.practice.content}
      onChange={this.change('content')}
      readOnly={!this.state.editingMode}
      style={{ width: '90%', fontSize: 16 }}
    />
  )
  renderDisscussionButton = () => {
    return (
      <FlatButton
        style={{ margin: 0 }}
        label={this.state.editingMode ? 'Cancel' : 'Discussion'}
        secondary
        onClick={ () => {} }
      />
    );
  }
  renderCancelButton = () => {
    return (
      <FlatButton
        style={{ margin: 0 }}
        label={'Cancel'}
        secondary
        onClick={ () => this.setState({
          practice: this.preparePractice(this.props.practice),
          editingMode: false
        })}
      />
    );
  }
  render() {
    const { practice, permissions } = this.props;
    const { editingMode } = this.state;
    if (!practice) return null;
    return (
      <Grid className={styles.BestPracticesPreview}>
        <Row className={styles['BestPracticesPreview-center-content']}>
          <Col sm={12} md={8} lg={8}>
            <Paper zDepth={1}>
              <Toolbar>
                <ToolbarGroup>
                  {this.renderTitleEditor()}
                </ToolbarGroup>
                <ToolbarGroup>
                  {permissions.isAuth && this.renderSaveEditButton()}
                  {editingMode ? this.renderCancelButton() : this.renderDisscussionButton()}
                </ToolbarGroup>
              </Toolbar>
              <div className={styles['BestPracticesPreview-content']}>
                {editingMode && this.renderContentEditor()}
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
