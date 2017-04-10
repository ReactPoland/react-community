import React, { Component } from 'react';
import DayPicker from 'react-day-picker';

const sundays = day => day.getDay() === 0;

const today = () => new Date();

export default class Calendar extends Component {
  state = { selectedDay: today() }

  handleDayClick = (day, { disabled, selected }) => {
    if (disabled) return;

    this.setState({ selectedDay: selected ? null : day });
  }

  render() {
    return (
      <DayPicker
        initialMonth={new Date(2017, 1)}
        disabledDays={sundays}
        selectedDays={this.state.selectedDay}
        onDayClick={this.handleDayClick}
      />
    );
  }
}
