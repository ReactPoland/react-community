import React, { Component } from 'react';
import PropTypes from 'prop-types';
// COMPONENTS
import Comment from './Comment';
import { RefreshButton } from 'components';
// LAYOUT
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class CommentsList extends Component {
  static propTypes = {
    articleId: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
    onReloadList: PropTypes.func,
    showReloadList: PropTypes.bool
  }

  render() {
    if (this.props.showReloadList) {
      return (
        <RefreshButton
          label="Reload comments"
          onClick={this.props.onReloadList}
        />
      );
    }

    return (
      <List style={{ marginTop: 24 }}>
        <Subheader>{this.props.comments.length} Comments</Subheader>
        {
          this.props.comments.map((comment) => (
            <div key={comment.id}>
              <Comment articleId={this.props.articleId} comment={comment} />
              <Divider inset />
            </div>
          ))
        }
      </List>
    );
  }
}

export default CommentsList;
