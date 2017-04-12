import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import _get from 'lodash/get';
import _partition from 'lodash/partition';
import { loadEvents, addEvent, editEvent, removeEvent } from 'redux/modules/eventsModule';
import { ascendingBy } from 'utils';
// COMPONENTS
import { Map } from 'components';
import AddEventDialog from './AddEventDialog';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { EventsCalendar, LoadingScreen } from 'components';
import { MockCard } from 'components/mocked';
import { Div } from 'components/styled';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon />
  </IconButton>
);

const mappedState = ({ events, auth }) => ({
  events: events.all,
  // Loading events
  loadingEvents: events.loadingEvents,
  eventsLoaded: events.eventsLoaded,
  // Adding a new event
  addingEvent: events.addingEvent,
  eventAdded: events.eventAdded,
  // Editing an event
  editingEvent: events.editingEvent,
  eventEdited: events.eventEdited,
  // Authorization
  loggedIn: auth.loggedIn,
  user: auth.user
});

const mappedActions = { loadEvents, addEvent, editEvent, removeEvent };

@connect(mappedState, mappedActions)
export default class EventsPage extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    // Loading events
    loadingEvents: PropTypes.bool.isRequired,
    eventsLoaded: PropTypes.bool.isRequired,
    loadEvents: PropTypes.func.isRequired,
    // Adding a new event
    addingEvent: PropTypes.bool.isRequired,
    eventAdded: PropTypes.number,
    addEvent: PropTypes.func.isRequired,
    // Editinging an event
    editingEvent: PropTypes.bool.isRequired,
    eventEdited: PropTypes.bool.isRequired,
    editEvent: PropTypes.func.isRequired,
    // Removing an event
    removeEvent: PropTypes.func.isRequired,
    // Authorization
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object
  }

  state = {
    showAddEventDialog: false,
    showEditEventDialog: false,
    eventToEdit: null
  }

  componentWillMount() {
    if (!this.props.eventsLoaded && !this.props.loadingEvents) this.props.loadEvents();
  }

  handleEventClick = (eventId) => {
    console.log('handleEventClick', eventId);
  }

  openAddEventDialog = () => {
    if (!this.props.loggedIn) return;
    this.setState({ showAddEventDialog: true });
  }

  closeAddEventDialog = () => {
    this.setState({
      showAddEventDialog: false,
      showEditEventDialog: false,
      eventToEdit: null
    });
  }

  addEvent = (eventData) => {
    if (!this.props.loggedIn) return;

    const newEvent = {
      title: eventData.title,
      organizedById: this.props.user.id,
      price: eventData.price,
      link: eventData.link,
      description: eventData.description,
      date: eventData.date,
      lat: _get(eventData, 'location.geometry.location', {}).lat(),
      lng: _get(eventData, 'location.geometry.location', {}).lng(),
      googleLocationId: eventData.location.place_id
    };

    this.props.addEvent(newEvent);
  }

  editEvent = (eventData) => {
    this.props.editEvent(eventData);
  }

  startEditingEvent = (eventId) => {
    if (!this.props.loggedIn) return;
    this.setState({
      showEditEventDialog: true,
      eventToEdit: this.props.events.find(event => event.id === eventId)
    });
  }

  deleteEvent = (eventId) => {
    if (!this.props.loggedIn) return;
    this.props.removeEvent(eventId);
  }

  render() {
    const allEvents = this.props.events;
    const firstEvent = allEvents[0];
    const centerCoords = firstEvent && [firstEvent.lat, firstEvent.lng];

    let userEvents = [];
    let otherEvents = [];

    if (this.props.user) {
      [userEvents, otherEvents] = _partition(allEvents, event => {
        return event.organizedById === this.props.user.id || event.organizedBy.id === this.props.user.id;
      });
    }

    const userHasEvents = userEvents.length > 0;
    const thereAreOtherEvents = otherEvents.length > 0;

    const addEventButton = (
      <FloatingActionButton
        style={{
          position: 'fixed',
          right: 40,
          bottom: 40,
          zIndex: 1000
        }}
        onClick={this.openAddEventDialog}
      >
        <ContentAdd />
      </FloatingActionButton>
    );

    const userEventsList = (
      <Paper style={{ padding: 16, marginBottom: 24 }}>
        <h3>Your events</h3>
        <List>
          {
            userEvents.sort(ascendingBy('date')).map((event) => {
              const date = moment(event.date).format('MMMM Do YYYY');
              return (
                <ListItem
                  key={event.id}
                  primaryText={event.title}
                  secondaryText={date}
                  rightIconButton={
                    <IconMenu iconButtonElement={iconButtonElement}>
                      <MenuItem onTouchTap={() => this.startEditingEvent(event.id)}>Edit</MenuItem>
                      <MenuItem onTouchTap={() => this.deleteEvent(event.id)}>Delete</MenuItem>
                    </IconMenu>
                  }
                  // onClick={() => this.handleEventClick(event.id)}
                />
              );
            })
          }
        </List>
      </Paper>
    );

    const otherEventsList = (
      <Paper style={{ padding: 16 }}>
        <h3>Other events</h3>
        <List>
          {
            otherEvents.sort(ascendingBy('date')).map((event) => {
              const date = moment(event.date).format('MMMM Do YYYY');
              return (
                <ListItem
                  key={event.id}
                  primaryText={event.title}
                  secondaryText={date}
                  onClick={() => this.handleEventClick(event.id)}
                />
              );
            })
          }
        </List>
      </Paper>
    );

    const allEventsList = (
      <Paper style={{ padding: 16 }}>
        <h3>All events</h3>
        <List>
          {
            allEvents.sort(ascendingBy('date')).map((event) => {
              const date = moment(event.date).format('MMMM Do YYYY');
              return (
                <ListItem
                  key={event.id}
                  primaryText={event.title}
                  secondaryText={date}
                  onClick={() => this.handleEventClick(event.id)}
                />
              );
            })
          }
        </List>
      </Paper>
    );

    return (
      <LoadingScreen loading={this.props.loadingEvents}>
        <Grid style={{ paddingTop: 24 }}>
          {this.props.loggedIn && addEventButton}
          <Helmet title="Events" />
          <MockCard
            title="React Events"
            content
          />
          <Paper style={{ overflow: 'hidden', marginBottom: 24 }}>
            <Div flex wrap>
              <Div flexVal={1} style={{ height: 200, minWidth: 200 }}>
                <Map
                  type="events"
                  style={{ height: '100%' }}
                  centerCoords={centerCoords}
                  markers={this.props.events}
                />
              </Div>
              <EventsCalendar />
            </Div>
          </Paper>
          {userHasEvents && userEventsList}
          {userHasEvents && thereAreOtherEvents && otherEventsList}
          {!userHasEvents && allEventsList}
          {this.props.loggedIn && <AddEventDialog
            popupVisible={this.state.showAddEventDialog || this.state.showEditEventDialog}
            closePopup={this.closeAddEventDialog}
            addEvent={this.addEvent}
            editEvent={this.editEvent}
            addingEvent={this.props.addingEvent}
            editingEvent={this.props.editingEvent}
            eventAdded={this.props.eventAdded}
            editMode={this.state.showEditEventDialog}
            dataToEdit={this.state.eventToEdit}
            eventEdited={this.props.eventEdited}
          />}
        </Grid>
      </LoadingScreen>
    );
  }
}
