// import _startsWith from 'lodash/startsWith';
import _isEmpty from 'lodash/isEmpty';
import { Raw, Plain } from 'slate';
import config from '../config';

export const ascendingBy = (key) => (a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0; // eslint-disable-line

export const descendingBy = (key) => (a, b) => a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0; // eslint-disable-line

export const eventFormValidator = (formData) => {
  const { title, link, description, location, date, price } = formData;
  const errors = {};
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  if (!title) errors.title = 'Title is required';
  if (!link.match(urlRegex) && link !== '') errors.link = 'Insert correct URL';// IN EVENTS LINK iS NOT required
  // if (!(_startsWith(link, 'http://') || _startsWith(link, 'https://'))) errors.link = 'Link must start with "http://"';
  if (!description) errors.description = 'Description is required';
  if (!location) errors.location = 'Location is required';
  if (price === '' || isNaN(price)) errors.price = 'Price must be a number';
  if (!date) errors.date = 'Date is required';

  return { isValid: _isEmpty(errors), errors };
};

export const gitAuthLink = () => {
  const state = Math.floor(Math.random() * 10000);
  return `${config.git.authUrl}/?client_id=${config.git.clientId}&redirect_uri=${config.git.redirectUrl}&state=${state}`;
};

// Slate helpers for converting it's state to other types
export const slate = {
  stateToText: state => Plain.serialize(state),
  stateToObject: state => Raw.serialize(state, { terse: true }),
  textToState: text => Plain.deserialize(text),
  objectToState: object => Raw.deserialize(object, { terse: true })
};
