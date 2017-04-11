import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import _get from 'lodash/get';
import { loadEvents, addEvent } from 'redux/modules/eventsModule';
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

const mappedState = ({ events, auth }) => ({
  events: events.all,
  // Loading events
  loadingEvents: events.loadingEvents,
  eventsLoaded: events.eventsLoaded,
  // Adding a new event
  addingEvent: events.addingEvent,
  eventAdded: events.eventAdded,
  // Authorization
  loggedIn: auth.loggedIn
});

const mappedActions = { loadEvents, addEvent };

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
    // Authorization
    loggedIn: PropTypes.bool.isRequired
  }

  state = { showAddEventDialog: false }

  componentWillMount() {
    if (!this.props.eventsLoaded && !this.props.loadingEvents) this.props.loadEvents();
  }

  openAddEventDialog = () => {
    if (!this.props.loggedIn) return;
    this.setState({ showAddEventDialog: true });
  }

  closeAddEventDialog = () => {
    this.setState({ showAddEventDialog: false });
  }

  addEvent = (eventData) => {
    if (!this.props.loggedIn) return;

    const newEvent = {
      title: eventData.title,
      organizedById: '',
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

  render() {
    const firstEvent = this.props.events[0];
    const centerCoords = firstEvent && [firstEvent.lat, firstEvent.lng];

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
          <Paper style={{ padding: '0 16px' }}>
            <List>
              {
                this.props.events.sort(ascendingBy('date')).map((event) => {
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
          {this.props.loggedIn && <AddEventDialog
            popupVisible={this.state.showAddEventDialog}
            closePopup={this.closeAddEventDialog}
            addEvent={this.addEvent}
            addingEvent={this.props.addingEvent}
            eventAdded={this.props.eventAdded}
          />}
        </Grid>
      </LoadingScreen>
    );
  }
}
