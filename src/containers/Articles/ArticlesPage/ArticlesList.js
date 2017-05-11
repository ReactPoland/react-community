import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
          this.props.articles.map(({ id, title, description, slug }) => (
            <ListItem
              key={id}
              primaryText={title}
              secondaryText={description}
              onClick={() => { this.props.onListItemClick({ id, slug }); }}
            />
          ))
        }
      </List>
    );
  }
}

export default ArticlesList;
