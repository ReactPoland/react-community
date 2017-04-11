import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import { loadEvents } from 'redux/modules/eventsModule';
// COMPONENTS
import LocationMap from 'containers/WorldPage/LocationMap';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { Calendar, LoadingScreen } from 'components';
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
    if (!this.props.eventsLoaded) this.props.loadEvents();
  }

  render() {
    const markers = this.props.events.map(({ id, lat, lng }) => ({ id, lat, lng }));
    const firstEvent = markers[0];
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
                <LocationMap
                  style={{ height: '100%' }}
                  centerCoords={centerCoords}
                  markers={markers}
                />
              </Div>
              <Calendar />
            </Div>
          </Paper>
          <Paper style={{ padding: '0 16px' }}>
            <List>
              {
                this.props.events.map((event) => {
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
