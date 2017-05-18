import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import { slate } from 'utils';
import styles from './BestPracticesPreview.scss';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import { RichTextEditor } from 'components';
import Paper from 'material-ui/Paper';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const mappedState = ({ practices }, props) => ({
  practice: _find(practices.all, pract => props.params.id === `${pract.id}`),
  editingPractice: practices.editingPractice,
  articleEdited: practices.articleEdited,
  removingPractice: practices.removingPractice,
});
@connect(mappedState)
export default class BestPracticesPreview extends Component {
  static propTypes = {
    practice: PropTypes.object,
    params: PropTypes.object.isRequired,
    practiceEdited: PropTypes.bool
  }
  state = {
    editingMode: false,
    practice: this.preparePractice(this.props.practice),
    validationErrors: {
      content: ''
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

  renderContentEditor = () => (
    <RichTextEditor
      initialState={this.state.practice.content}
      onChange={this.change('content')}
      readOnly={!this.state.editingMode}
      style={{ width: '100%', fontSize: 20 }}
    />
  )
  renderSaveEditButton = () => {
    return (
      <FlatButton
        style={{ margin: 0 }}
        label={this.state.editingMode ? 'Save' : 'Edit'}
        primary
        onClick={ () => this.setState({ editingMode: !this.state.editingMode })}
      />
    );
  }
  renderDisscussionCancelButton = () => {
    return (
      <FlatButton
        style={{ margin: 0 }}
        label={this.state.editingMode ? 'Cancel' : 'Discussion'}
        secondary
        onClick={ () => this.setState({ editingMode: !this.state.editingMode })}
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
                <ToolbarTitle text={practice.title}/>
                <ToolbarGroup>
                  {this.renderSaveEditButton()}
                  {this.renderDisscussionCancelButton()}
                </ToolbarGroup>
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
