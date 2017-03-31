import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadConversation, clearLoadConversationError } from 'redux/modules/conversationModule';
// COMPONENTS
import CommentsList from './CommentsList';

const mappedState = ({ conversation }) => ({
  conversationId: conversation.id,
  comments: conversation.comments,
  loadingConversation: conversation.loadingConversation,
  conversationLoaded: conversation.conversationLoaded,
  loadConversationError: conversation.loadConversationError
});

const mappedActions = {
  loadConversation,
  clearLoadConversationError
};

@connect(mappedState, mappedActions)
class Conversation extends Component {
  static propTypes = {
    articleId: PropTypes.number.isRequired,
    conversationId: PropTypes.number,
    comments: PropTypes.array.isRequired,
    loadingConversation: PropTypes.bool.isRequired,
    conversationLoaded: PropTypes.bool.isRequired,
    loadConversationError: PropTypes.string.isRequired,
    loadConversation: PropTypes.func.isRequired,
    clearLoadConversationError: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadConversation(this.props.articleId);
  }

  loadConversation = () => {
    this.props.loadConversation(this.props.articleId);
  }

  render() {
    return (
      <div>
        <h3>Conversation ID: {this.props.conversationId}</h3>
        <CommentsList
          comments={this.props.comments}
          onListItemClick={(id) => { console.log(id); }}
        />
        <button
          onClick={this.loadConversation}
          disabled={this.props.loadingConversation}
        >
          {this.props.loadingConversation ? 'Loading...' : 'Load'}
        </button>
      </div>
    );
  }
}

export default Conversation;
