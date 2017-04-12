import _startsWith from 'lodash/startsWith';
import _isEmpty from 'lodash/isEmpty';

export const ascendingBy = (key) => (a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0; // eslint-disable-line

export const descendingBy = (key) => (a, b) => a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0; // eslint-disable-line

export const eventFormValidator = (formData) => {
  const { title, link, description, location, date, price } = formData;
  const errors = {};

  if (!title) errors.title = 'Title is required';
  if (!link || link === 'http://') errors.link = 'Link is required';
  if (!(_startsWith(link, 'http://') || _startsWith(link, 'https://'))) errors.link = 'Link must start with "http://"';
  if (!description) errors.description = 'Description is required';
  if (!location) errors.location = 'Location is required';
  if (price === '' || isNaN(price)) errors.price = 'Price must be a number';
  if (!date) errors.date = 'Date is required';

  return { isValid: _isEmpty(errors), errors };
};
