import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';

const iconButtonElement = (
  <IconButton touch>
    <MoreVertIcon />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem leftIcon={<EditIcon />}>Edit</MenuItem>
    <MenuItem leftIcon={<DeleteIcon />}>Delete</MenuItem>
  </IconMenu>
);

class ArticlesList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  render() {
    return (
      <List>
        {
          this.props.articles.map(art => (
            <ListItem
              key={art.id}
              primaryText={art.title}
              rightIconButton={rightIconMenu}
            />
          ))
        }
      </List>
    );
  }
}

export default ArticlesList;
