import React, { Component, PropTypes } from 'react';
// LAYOUT
import { List, ListItem } from 'material-ui/List';

class CommentsList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    onListItemClick: PropTypes.func.isRequired
  }

  render() {
    return (
      <List>
        {
          this.props.comments.map(({ id, message }) => (
            <ListItem
              key={id}
              primaryText={message}
              onClick={() => { this.props.onListItemClick(id); }}
            />
          ))
        }
      </List>
    );
  }
}

export default CommentsList;
