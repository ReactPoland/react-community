import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import { slate } from 'utils';
import permission from 'utils/privileges';
// STORE
import { editTutorial, removeTutorial } from 'redux/modules/tutorialsModule';
// LAYOUT
import styles from './TutorialPreview.scss';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { PlainTextEditor, RichTextEditor } from 'components';
import Paper from 'material-ui/Paper';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const mappedState = ({ tutorials, auth }, props) => ({
  tutorial: _find(tutorials.all, tut => props.params.id === `${tut.id}`),
  editingTutorial: tutorials.editingTutorial,
  tutorialEdited: tutorials.tutorialEdited,
  removingTutorial: tutorials.removingTutorial,
  permissions: permission(auth.user)
});
const mappedActions = {
  editTutorial,
  removeTutorial
};
@connect(mappedState, mappedActions)
export default class TutorialPreview extends Component {
  static propTypes = {
    tutorial: PropTypes.object,
    params: PropTypes.object.isRequired,
    tutorialEdited: PropTypes.bool,
    editTutorial: PropTypes.func.isRequired,
    removeTutorial: PropTypes.func.isRequired,
    permissions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }
  state = {
    editingMode: false,
    tutorial: this.prepareTutorial(this.props.tutorial),
    validationErrors: {
      content: '',
      text: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    const { tutorial = {} } = nextProps;
    // When article was successfully updated...
    if (nextProps.tutorialEdited !== this.props.tutorialEdited) {
      this.setState({
        editingMode: false,
        tutorial: this.prepareTutorial(tutorial)
      });
    }
  }

  // Prepares article content to use Slate's state objects
  prepareTutorial(tutorial) {
    if (!tutorial) return {};

    return {
      ...tutorial,
      content: _isEmpty(tutorial.content) ? {} : slate.objectToState(tutorial.content),
      title: slate.textToState(tutorial.title)
    };
  }
  // Updates state of the tutorial
  change = (property) => (value) => {
    const tutorial = { ...this.state.tutorial };
    const validationErrors = { ...this.state.validationErrors };

    // Update tutorial
    tutorial[property] = value;
    // Hide existing validation error
    if (validationErrors[property] && value) validationErrors[property] = '';

    this.setState({ tutorial, validationErrors });
  }
  validateTutorial = (tutorialData) => {
    const { title } = tutorialData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  saveEditButtonActions = () => {
    const tutorial = { ...this.state.tutorial };
    if (!this.validateTutorial(tutorial)) return;
    if (this.state.editingMode) {
      if (!_isEmpty(this.state.tutorial.content)) tutorial.content = slate.stateToObject(this.state.tutorial.content);
      if (!_isEmpty(this.state.tutorial.plainText)) tutorial.plainText = slate.stateToText(this.state.tutorial.content);
      if (!_isEmpty(this.state.tutorial.title)) tutorial.title = slate.stateToText(this.state.tutorial.title);
      this.props.editTutorial(tutorial);
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
      state={this.state.tutorial.title}
      onChange={this.change('title')}
      readOnly={!this.state.editingMode}
      style={{ fontSize: 20 }}
    />
  )
  renderContentEditor = () => (
    <RichTextEditor
      state={this.state.tutorial.content}
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
  renderRemoveButton = () => {
    const { tutorial, router } = this.props;
    return (
      <IconButton onClick={() => {
        router.goBack();
        this.props.removeTutorial(tutorial.id);
      }}>
        <ActionDelete color="#ff0000" />
      </IconButton>
    );
  }
  renderCancelButton = () => {
    return (
      <FlatButton
        style={{ margin: 0 }}
        label={'Cancel'}
        secondary
        onClick={ () => this.setState({
          tutorial: this.prepareTutorial(this.props.tutorial),
          editingMode: false
        })}
      />
    );
  }
  render() {
    const { tutorial, permissions } = this.props;
    const { editingMode } = this.state;
    if (!tutorial) return null;
    return (
      <Grid className={styles.TutorialPreview}>
        <Row className={styles['TutorialPreview-center-content']}>
          <Col sm={12} md={8} lg={8}>
            <Paper zDepth={1}>
              <Toolbar>
                <ToolbarGroup>
                  {this.renderTitleEditor()}
                </ToolbarGroup>
                <ToolbarGroup>
                  {permissions.isStaff && this.renderSaveEditButton()}
                  {editingMode ? this.renderCancelButton() : this.renderDisscussionButton()}
                  {permissions.isStaff && this.renderRemoveButton()}
                </ToolbarGroup>
              </Toolbar>
              <div className={styles['TutorialPreview-content']}>
                {this.renderContentEditor()}
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
