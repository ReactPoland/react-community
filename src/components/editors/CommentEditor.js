import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import FlatButton from 'material-ui/FlatButton';
import editorStyles from './CommentEditor.scss';
import { submitComment, loadConversation } from 'redux/modules/conversationModule';
import { Spinner } from 'components';

// --- Example plugin usage ---
// import createHashtagPlugin from 'draft-js-hashtag-plugin';
// const hashtagPlugin = createHashtagPlugin();
// const plugins = [hashtagPlugin];

const mappedState = ({ conversation }) => ({
  addingComment: conversation.addingComment,
  commentAdded: conversation.commentAdded,
  addCommentError: conversation.addCommentError
});

const mappedActions = { submitComment, loadConversation };

@connect(mappedState, mappedActions)
export default class CommentEditor extends Component {
  static propTypes = {
    articleId: PropTypes.number.isRequired,
    addingComment: PropTypes.bool.isRequired,
    commentAdded: PropTypes.bool.isRequired,
    addCommentError: PropTypes.bool.isRequired,
    submitComment: PropTypes.func.isRequired,
    loadConversation: PropTypes.func.isRequired
  }

  state = {
    editorState: createEditorStateWithText('')
  }

  componentWillReceiveProps(nextProps) {
    // If we successfully added a new comment...
    if (!this.props.commentAdded && nextProps.commentAdded) {
      // Clear state
      this.setState({ editorState: createEditorStateWithText('') });
      // Refresh comments list
      // NOTE: instead of refreshing whole list, we could append new comments to the list in the store
      this.props.loadConversation(this.props.articleId);
    }
  }

  update = (editorState) => {
    this.setState({ editorState });
  }

  submit = () => {
    const comment = this.state.editorState.getCurrentContent().getPlainText();

    if (!comment) return;

    this.props.submitComment({ articleId: this.props.articleId, body: comment });
  }

  render() {
    return (
      <div className={editorStyles.editor}>
        {this.props.addingComment && <Spinner
          style={{ position: 'absolute', top: 0, left: 0, background: 'rgba(255, 255, 255, 0.8)', zIndex: 10 }}
        />}
        <Editor
          editorState={this.state.editorState}
          onChange={this.update}
          // plugins={plugins}
        />
        <FlatButton
          label="Add comment"
          primary
          onTouchTap={this.submit}
        />
      </div>
    );
  }
}
