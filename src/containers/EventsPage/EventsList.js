import React from 'react';
import PropTypes from 'prop-types';
import { ascendingBy } from 'utils';
// COMPONENTS
import EventsListItem from './EventsListItem';
// LAYOUT
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';

const EventsList = (props) => (
    <Paper style={{ padding: 16, marginBottom: 24 }}>
      {props.title && <h3>{props.title}</h3>}
      <List>{!props.range || (!props.range.from || !props.range.to) || (props.range.from === props.range.to)
        ? props.events
          .sort(ascendingBy('date'))
          .map((event) => (
            <EventsListItem
              key={event.id}
              event={event}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
            />
          ))
        : props.events
          .sort(ascendingBy('date'))
          .filter((event) => (props.range && (props.range.from < Date.parse(event.date)) && (Date.parse(event.date) < props.range.to)))
          .map((event) => (
            <EventsListItem
              key={event.id}
              event={event}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
            />
          ))
      }</List>
    </Paper>
  );


EventsList.propTypes = {
  title: PropTypes.string,
  events: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  range: PropTypes.object
};

export default EventsList;
