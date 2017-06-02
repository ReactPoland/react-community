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

  getCurrentTopButtons = () => {
    let buttons = this.generalMode.topButtons;
    if (this.state.editingMode) buttons = this.editingMode.topButtons;

    const viewButtons = [];

    buttons.map((buttItem, key) => {
      let allow = true;
      if (buttItem.shouldShow) {
        if (!buttItem.shouldShow()) allow = false;
      }
      if (allow) viewButtons.push(<TopButton {...buttItem.params} key={key} />);
    });

    return viewButtons;
  }

  generalMode = {
    topButtons: [{
      shouldShow: () => this.props.permissions.isAuth,
      params: {
        label: 'Edit',
        primary: true,
        onClick: () => this.setState({ editingMode: true })
      }
    }, {
      shouldShow: () => this.props.permissions.isAuth,
      params: {
        label: 'Discussion',
        secondary: true,
        onClick: () => console.log('Discussion')
      }
    }]
  }

  editingMode = {
    topButtons: [{
      shouldShow: () => this.props.permissions.isAuth,
      params: {
        label: 'Save',
        primary: true,
        onClick: () => this.saveButtonActions()
      }
    }, {
      params: {
        label: 'Close',
        secondary: true,
        onClick: () => this.setState({
          practice: this.preparePractice(this.props.practice),
          editingMode: false
        })
      }
    }]
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

  saveButtonActions = () => {
    const practice = { ...this.state.practice };

    if (!_isEmpty(this.state.practice.content)) practice.content = slate.stateToObject(this.state.practice.content);
    if (!_isEmpty(this.state.practice.plainText)) practice.plainText = slate.stateToText(this.state.practice.content);
    if (!_isEmpty(this.state.practice.title)) practice.title = slate.stateToText(this.state.practice.title);

    if (!this.validatePractice(practice)) return;

    this.props.editPractice(practice);

    this.setState({ editingMode: false });
  }

  renderTitleEditor = () => (
    <PlainTextEditor
      state={this.state.practice.title}
      onChange={this.change('title')}
      readOnly={!this.state.editingMode}
      style={{ fontSize: 20 }}
    />
  )
  renderContentEditor = () => {
    return (
      <RichTextEditor
        state={this.state.practice.content}
        onChange={this.change('content')}
        readOnly={!this.state.editingMode}
        style={{ width: '90%', fontSize: 16 }}
      />
    );
  }

  render() {
    const { practice } = this.props;
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
                <ToolbarGroup>{this.getCurrentTopButtons()}</ToolbarGroup>
              </Toolbar>
              <div className={styles['BestPracticesPreview-content']}>
                {this.renderContentEditor()}
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const TopButton = ({ ...params }) => (
  <FlatButton
    style={{ margin: 0 }}
    {...params}
  />
);
