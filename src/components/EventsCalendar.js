import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
// STORE
import { loadEvents } from 'redux/modules/eventsModule';
// COMPONENTS
import { LoadingScreen } from 'components';

const debug = false;
const now = moment();

const mappedState = ({ events }) => ({
  events: events.all,
  loadingEvents: events.loadingEvents,
  eventsLoaded: events.eventsLoaded
});

const mappedActions = { loadEvents };

@connect(mappedState, mappedActions)
export default class EventsCalendar extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    loadingEvents: PropTypes.bool.isRequired,
    eventsLoaded: PropTypes.bool.isRequired,
    loadEvents: PropTypes.func.isRequired,
    onDayClick: PropTypes.func
  }

  state = {
    from: null,
    to: null
  }

  componentWillMount() {
    if (!this.props.eventsLoaded && !this.props.loadingEvents) this.props.loadEvents();
  }

  handleDayClick = (day, modifiers) => {
    if (modifiers.disabled) return;
    const range = DateUtils.addDayToRange(day, this.state);
    if (range.from) {
      let rangeTo = new Date(range.from.setHours(23, 59));
      range.from = new Date(range.from.setHours(0, 0));
      if (range.to) rangeTo = new Date(range.to.setHours(23, 59));
      range.to = rangeTo;
    }
    this.setState(range);
    if (this.props.onDayClick) this.props.onDayClick(range);
    if (debug) console.info('Clicked date:', day, modifiers);

    this.setState({ selectedDay: modifiers.selected ? null : day });
  }

  render() {
    const { from, to } = this.state;
    return (
      <LoadingScreen loading={this.props.loadingEvents}>
        <DayPicker
          initialMonth={now.toDate()}
          selectedDays={[from, { from, to }]}
          onDayClick={this.handleDayClick}
          modifiers={{
            hasEvent: (day) => {
              // Mark days that has the same date as an event
              return !!this.props.events.find(event => moment(day).isSame(moment(event.date), 'day'));
            }
          }}
        />
      </LoadingScreen>
    );
  }
}
