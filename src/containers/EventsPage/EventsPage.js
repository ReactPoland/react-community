import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import { loadEvents } from 'redux/modules/eventsModule';
import { ascendingBy } from 'utils';
// COMPONENTS
import { Map } from 'components';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { EventsCalendar, LoadingScreen } from 'components';
import { MockCard } from 'components/mocked';
import { Div } from 'components/styled';

const mappedState = ({ events }) => ({
  events: events.all,
  loadingEvents: events.loadingEvents,
  eventsLoaded: events.eventsLoaded
});

const mappedActions = { loadEvents };

@connect(mappedState, mappedActions)
export default class EventsPage extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    loadingEvents: PropTypes.bool.isRequired,
    eventsLoaded: PropTypes.bool.isRequired,
    loadEvents: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (!this.props.eventsLoaded && !this.props.loadingEvents) this.props.loadEvents();
  }

  render() {
    const firstEvent = this.props.events[0];
    const centerCoords = firstEvent && [firstEvent.lat, firstEvent.lng];

    return (
      <LoadingScreen loading={this.props.loadingEvents}>
        <Grid style={{ paddingTop: 24 }}>
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
        </Grid>
      </LoadingScreen>
    );
  }
}
