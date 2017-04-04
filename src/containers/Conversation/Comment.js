import React, { Component, PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  renderContent = (type, { id, author, message }) => (
    <div key={`${type}_${id}`}>
      <p><strong>{author}</strong></p>
      <p>{message}</p>
    </div>
  )

  render() {
    const { comment } = this.props;

    return (
      <ListItem
        leftAvatar={<Avatar src={comment.pictureUrl} />}
        secondaryText={comment.replies && comment.replies.length > 0 && <p>{comment.replies.length} Replies</p>}
        children={this.renderContent('comment', comment)}
        disabled={!comment.replies.length}
        primaryTogglesNestedList
        nestedItems={(comment.replies || []).map((reply) => (
          <ListItem
            key={reply.id}
            leftAvatar={<Avatar src={reply.pictureUrl} />}
            children={this.renderContent('reply', reply)}
            disabled
          />
        ))}
      />
    );
  }
}

export default Comment;
