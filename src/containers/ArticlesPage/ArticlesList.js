import React, { Component, PropTypes } from 'react';
// LAYOUT
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

const rightIconMenu = ({ onMenuItemClick }) => (
  <IconMenu
    iconButtonElement={iconButtonElement}
    onItemTouchTap={(ev, child) => { onMenuItemClick(child.props.action); }}
  >
    <MenuItem
      action="edit"
      primaryText="Edit"
      leftIcon={<EditIcon />}
    />
    <MenuItem
      action="delete"
      primaryText="Delete"
      leftIcon={<DeleteIcon />}
    />
  </IconMenu>
);

class ArticlesList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    onMenuItemClick: PropTypes.func.isRequired,
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
              rightIconButton={
                rightIconMenu({
                  onMenuItemClick: (type) => {
                    this.props.onMenuItemClick({ type, id });
                  }
                })
              }
            />
          ))
        }
      </List>
    );
  }
}

export default ArticlesList;
