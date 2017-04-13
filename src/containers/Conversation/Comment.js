import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  renderContent = ({ id, user, body, createdAt }) => (
    <div key={`content_${id}`}>
      <p><strong>{user.firstName} {user.lastName}</strong></p>
      <p>{body}</p>
      <p title={moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}>
        <small>{moment(createdAt).fromNow()}</small>
      </p>
    </div>
  )

  render() {
    const { comment } = this.props;

    return (
      <ListItem
        leftAvatar={<Avatar src={comment.user.pictureURL} />}
        // secondaryText={comment.replies && comment.replies.length > 0 && <p>{comment.replies.length} Replies</p>}
        children={this.renderContent(comment)}
        // disabled={!comment.replies.length}
        // primaryTogglesNestedList
        // nestedItems={(comment.replies || []).map((reply) => (
        //   <ListItem
        //     key={reply.id}
        //     leftAvatar={<Avatar src={reply.pictureUrl} />}
        //     children={this.renderContent('reply', reply)}
        //     disabled
        //   />
        // ))}
      />
    );
  }
}

export default Comment;
