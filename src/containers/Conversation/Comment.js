import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
// COMPONENTS
import { CommentEditor } from 'components';
// LAYOUT
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const mappedState = ({ auth }) => ({
  loggedIn: auth.loggedIn
});

@connect(mappedState)
class Comment extends Component {
  static propTypes = {
    articleId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired
  }

  state = {
    replyInputVisible: false
  }

  showReplyInput = () => {
    this.setState({ replyInputVisible: true });
  }

  hideReplyInput = () => {
    this.setState({ replyInputVisible: false });
  }

  renderContent = ({ id, user, body, createdAt }) => (
    <div key={`content_${id}`}>
      <p><strong>{user.firstName} {user.lastName}</strong></p>
      <p>{body}</p>
      <p title={moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}>
        <small>{moment(createdAt).fromNow()}</small>
      </p>
      {!this.state.replyInputVisible && this.props.loggedIn &&
        <button onClick={this.showReplyInput}>
          Reply
        </button>}
      {this.state.replyInputVisible &&
        <CommentEditor
          articleId={this.props.articleId}
          parentCommentId={id}
          onCancel={this.hideReplyInput}
        />}
    </div>
  )

  render() {
    const { comment } = this.props;

    return (
      <ListItem
        leftAvatar={<Avatar src={comment.user.pictureURL} />}
        children={this.renderContent(comment)}
      />
    );
  }
}

export default Comment;
