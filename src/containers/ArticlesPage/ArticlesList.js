import React, { Component, PropTypes } from 'react';
// LAYOUT
import { List, ListItem } from 'material-ui/List';

class ArticlesList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    onListItemClick: PropTypes.func.isRequired
  }

  render() {
    return (
      <List>
        {
          this.props.articles.map(({ id, title }) => (
            <ListItem
              key={id}
              primaryText={title}
              onClick={() => { this.props.onListItemClick(id); }}
            />
          ))
        }
      </List>
    );
  }
}

export default ArticlesList;
