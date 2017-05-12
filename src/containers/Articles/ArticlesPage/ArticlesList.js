import React from 'react';
import PropTypes from 'prop-types';
// LAYOUT
import { List, ListItem } from 'material-ui/List';

const ArticlesList = (props) => (
  <List>
    {props.articles.map((article) => (
      <ListItem
        key={article.id}
        primaryText={article.title}
        rightIcon={article.type === 'external' && <i className="material-icons">open_in_new</i> || null}
        onClick={() => { props.onListItemClick(article); }}
      />
    ))}
  </List>
);

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired,
  onListItemClick: PropTypes.func.isRequired
};

export default ArticlesList;
