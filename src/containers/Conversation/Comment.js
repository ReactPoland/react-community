import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
// COMPONENTS
import { CommentEditor } from 'components';
// LAYOUT
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const debug = false;

@connect(({ auth }) => ({ loggedIn: auth.loggedIn }))
export default class Comment extends Component {
  static propTypes = {
    articleId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired
  }

  state = { replyInputVisible: null }

  showReplyInput = (id) => {
    this.setState({ replyInputVisible: id });
  }

  hideReplyInput = () => {
    this.setState({ replyInputVisible: null });
  }

  renderComment = (type, comment) => (
    <ListItem
      key={`${type}_${comment.id}`}
      leftAvatar={<Avatar src={comment.user.pictureURL} />}
      secondaryText={
        comment.replies && comment.replies.length > 0 &&
          <p>{comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</p>
      }
      disabled={!comment.replies || !comment.replies.length}
      initiallyOpen
      primaryTogglesNestedList
      nestedItems={(comment.replies || []).map(reply => this.renderComment('reply', reply))}
      children={this.renderCommentContent(type, comment)}
    />
  )

  renderCommentContent = (type, { id, depth, parentCommentId, user, body, createdAt }) => (
    <div key={`${type}_${id}`}>
      {debug && <p>ID: {id} {parentCommentId && `parentCommentId: ${parentCommentId}`} depth: {depth}</p>}
      <p><strong>{user.firstName} {user.lastName}</strong></p>
      <p>{body}</p>
      <p title={moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}>
        <small>{moment(createdAt).fromNow()}</small>
      </p>
      {this.state.replyInputVisible !== id && this.props.loggedIn &&
        <button onClick={() => this.showReplyInput(id)}>
          Reply
        </button>}
      {this.state.replyInputVisible === id &&
        <CommentEditor
          articleId={this.props.articleId}
          parentCommentId={id}
          onCancel={this.hideReplyInput}
        />}
    </div>
  )

  render = () => this.renderComment('comment', this.props.comment)
}
