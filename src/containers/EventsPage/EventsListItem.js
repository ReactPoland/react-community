import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// LAYOUT
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const EventsListItem = (props) => {
  const showMenu = !!(props.onDelete || props.onEdit);
  const onEdit = () => props.onEdit(props.event.id);
  const onDelete = () => props.onDelete(props.event.id);

  const menu = (
    <IconMenu iconButtonElement={
      <IconButton touch tooltipPosition="bottom-left">
        <MoreVertIcon />
      </IconButton>
    }>
      {props.onEdit && <MenuItem onTouchTap={onEdit}>Edit</MenuItem>}
      {props.onDelete && <MenuItem onTouchTap={onDelete}>Delete</MenuItem>}
    </IconMenu>
  );

  return (
    <ListItem
      onClick={props.onSelect(props.event.id)}
      key={props.event.id}
      primaryText={props.event.title}
      secondaryText={moment(props.event.date).format('MMMM Do YYYY')}
      rightIconButton={showMenu && menu || null}
    />
  );
};

EventsListItem.propTypes = {
  event: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func
};

export default EventsListItem;
