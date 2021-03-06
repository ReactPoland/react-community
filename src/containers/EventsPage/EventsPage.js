import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _partition from 'lodash/partition';
import { loadEvents, addEvent, editEvent, removeEvent } from 'redux/modules/eventsModule';
// COMPONENTS
import { Map } from 'components';
import AddEventDialog from './AddEventDialog';
import EditEventDialog from './EditEventDialog';
import ViewEventDialog from './ViewEventDialog';
import EventsList from './EventsList';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { EventsCalendar, LoadingScreen } from 'components';
import { Div } from 'components/styled';
import permission from 'utils/privileges';
import { showError } from 'redux/modules/errorsModule';

const mappedState = ({ events, auth }) => ({
  events: events.all,
  // Loading events
  loadingEvents: events.loadingEvents,
  eventsLoaded: events.eventsLoaded,
  // Authorization
  loggedIn: auth.loggedIn,
  user: auth.user,
  permission: permission(auth.user)
});

const mappedActions = {
  loadEvents,
  addEvent,
  editEvent,
  removeEvent,
  showError
};

@connect(mappedState, mappedActions)
export default class EventsPage extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    // Loading events
    loadingEvents: PropTypes.bool.isRequired,
    eventsLoaded: PropTypes.bool.isRequired,
    loadEvents: PropTypes.func.isRequired,
    // Adding a new event
    addEvent: PropTypes.func.isRequired,
    // Editing an event
    editEvent: PropTypes.func.isRequired,
    // Removing an event
    removeEvent: PropTypes.func.isRequired,
    // Authorization
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object,
    permission: PropTypes.object,
    showError: PropTypes.func.isRequired
  }

  state = {
    showAddEventDialog: false,
    showEditEventDialog: false,
    eventDetailDialog: null,
    eventToEditId: null,
    rangeToFilterEvents: null
  }

  componentWillMount() {
    // Load events, if they're not ready
    if (!this.props.eventsLoaded && !this.props.loadingEvents) this.props.loadEvents();

    // Initializes Google Maps code
    const { google } = window;
    this.geocoder = new google.maps.Geocoder;
  }

  onSelectDays = (range) => {
    this.setState({ rangeToFilterEvents: range });
  }

  onSelectEvent = (id) => () => {
    const event = this.props.events.find(currentEvent => currentEvent.id === id);
    this.getLocation(event.googleLocationId).then(location => {
      this.setState({
        eventDetailDialog: {
          ...event,
          location
        }
      });
    });
  }

  getLocation = async (googleLocationId) => {
    if (!googleLocationId) return undefined;
    return new Promise(resolve => {
      this.geocoder.geocode({ placeId: googleLocationId }, results => {
        resolve(results[0]);
      });
    });
  }

  closeEventDetail = () => this.setState({ eventDetailDialog: null })

  prepareEvent = (eventData) => {
    return {
      id: eventData.id,
      title: eventData.title,
      organizedById: this.props.user.id,
      price: eventData.price,
      link: eventData.link,
      description: eventData.description,
      date: eventData.date,
      lat: eventData.location.geometry.location.lat(),
      lng: eventData.location.geometry.location.lng(),
      googleLocationId: eventData.location.place_id
    };
  }

  // DIALOG WINDOW (MODAL) HANDLING

  openAddEventDialog = () => {
    if (this.props.permission.isAuth) this.setState({ showAddEventDialog: true });
    else this.props.showError({ requestName: 'Add new event', error: new Error('Please authorize') });
  }

  closeAddEventDialog = () => {
    this.setState({ showAddEventDialog: false });
  }

  openEditEventDialog = (eventId) => {
    this.setState({
      showEditEventDialog: true,
      eventToEditId: eventId
    });
  }

  closeEditEventDialog = () => {
    this.setState({
      showEditEventDialog: false,
      eventToEditId: null
    });
  }

  // REDUX/API CALLS

  addEvent = (eventData) => {
    this.props.addEvent(this.prepareEvent(eventData));
  }

  editEvent = (eventData) => {
    this.props.editEvent(this.prepareEvent(eventData));
  }

  deleteEvent = (eventId) => {
    this.props.removeEvent(eventId);
  }

  // RENDER

  render() {
    // Prepare events' lists
    const allEvents = this.props.events;
    const firstEvent = allEvents[0];

    let userEvents = [];
    let otherEvents = [];

    if (this.props.user) {
      [userEvents, otherEvents] = _partition(allEvents, event => {
        return event.organizedById === this.props.user.id || event.organizedBy.id === this.props.user.id;
      });
    }

    const userHasEvents = userEvents.length > 0;
    const thereAreOtherEvents = otherEvents.length > 0;

    // Events lists components

    const userEventsList = (
      <EventsList
        title="Your events"
        events={userEvents}
        range={this.state.rangeToFilterEvents}
        onEdit={this.openEditEventDialog}
        onSelectEvent={this.onSelectEvent}
        onDelete={this.deleteEvent}
      />
    );

    const otherEventsList = (
      <EventsList
        title="Other events"
        range={this.state.rangeToFilterEvents}
        onSelectEvent={this.onSelectEvent}
        events={otherEvents} />
    );

    const allEventsList = (
      <EventsList
        title="All events"
        onSelectEvent={this.onSelectEvent}
        range={this.state.rangeToFilterEvents}
        events={allEvents} />
    );

    // Other components

    const centerCoords = firstEvent && [firstEvent.lat, firstEvent.lng];

    const mapAndCalendar = (
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
          <EventsCalendar
            onDayClick={this.onSelectDays}
          />
        </Div>
      </Paper>
    );

    return (
      <LoadingScreen loading={this.props.loadingEvents}>
        <Grid style={{ paddingTop: 24 }}>
          <FloatingActionButton
            style={{
              position: 'fixed',
              right: 40,
              bottom: 40,
              zIndex: 1000
            }}
            onClick={this.openAddEventDialog} >
            <ContentAdd />
          </FloatingActionButton>

          <Helmet title="Events" />
          <h1 style={{ margin: '0 0 20px 0' }}>React Events</h1>
          {mapAndCalendar}
          {/* Events lists */}
          {userHasEvents && userEventsList}
          {userHasEvents && thereAreOtherEvents && otherEventsList}
          {!userHasEvents && allEventsList}
          {/* Event modals with forms */}
          <AddEventDialog
            popupVisible={this.state.showAddEventDialog}
            closePopup={this.closeAddEventDialog}
            addEvent={this.addEvent}
          />
          <EditEventDialog
            eventId={this.state.eventToEditId}
            popupVisible={this.state.showEditEventDialog}
            closePopup={this.closeEditEventDialog}
            editEvent={this.editEvent}
          />
          <ViewEventDialog
            open={!!this.state.eventDetailDialog}
            closePopup={this.closeEventDetail}
            event={this.state.eventDetailDialog} />
        </Grid>
      </LoadingScreen>
    );
  }
}
