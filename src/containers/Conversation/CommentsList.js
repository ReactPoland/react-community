import React, { Component, PropTypes } from 'react';
// COMPONENTS
import Comment from './Comment';
// LAYOUT
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

class CommentsList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    onReloadList: PropTypes.func,
    showReloadList: PropTypes.bool
  }

  render() {
    if (this.props.showReloadList) {
      return (
        <FlatButton
          label="Reload comments"
          labelPosition="before"
          icon={<RefreshIcon />}
          secondary
          onClick={this.props.onReloadList}
        />
      );
    }

    return (
      <List>
        <Subheader>{this.props.comments.length} Comments</Subheader>
        {
          this.props.comments.map((comment) => (
            <div key={comment.id}>
              <Comment comment={comment} />
              <Divider inset />
            </div>
          ))
        }
      </List>
    );
  }
}

export default CommentsList;
