import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadConversation } from 'redux/modules/conversationModule';
// COMPONENTS
import CommentsList from './CommentsList';
import { LoadingScreen } from 'components';

const mappedState = ({ conversation }) => ({
  conversationId: conversation.id,
  comments: conversation.comments,
  loadingConversation: conversation.loadingConversation,
  conversationLoaded: conversation.conversationLoaded,
  loadConversationError: conversation.loadConversationError
});

const mappedActions = { loadConversation };

@connect(mappedState, mappedActions)
class Conversation extends Component {
  static propTypes = {
    articleId: PropTypes.number.isRequired,
    conversationId: PropTypes.number,
    comments: PropTypes.array.isRequired,
    loadingConversation: PropTypes.bool.isRequired,
    conversationLoaded: PropTypes.bool.isRequired,
    loadConversationError: PropTypes.bool.isRequired,
    loadConversation: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.loadComments();
  }

  loadComments = () => {
    this.props.loadConversation(this.props.articleId);
  }

  render() {
    return (
      <LoadingScreen loading={this.props.loadingConversation}>
        <CommentsList
          comments={this.props.comments}
          showReloadList={this.props.loadConversationError}
          onReloadList={this.loadComments}
        />
      </LoadingScreen>
    );
  }
}

export default Conversation;
