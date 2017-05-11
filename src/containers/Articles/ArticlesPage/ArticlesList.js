import React, { Component } from 'react';
import PropTypes from 'prop-types';
// LAYOUT
import { List, ListItem } from 'material-ui/List';

export default class ArticlesList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    onListItemClick: PropTypes.func.isRequired
  }

  render() {
    return (
      <List>
        {this.props.articles.map((article) => (
          <ListItem
            key={article.id}
            primaryText={article.title}
            secondaryText={article.description}
            onClick={() => { this.props.onListItemClick(article); }}
          />
        ))}
      </List>
    );
  }
}
