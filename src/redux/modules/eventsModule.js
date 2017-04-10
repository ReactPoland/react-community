// --- ACTION TYPES ---
// LOAD
const LOAD_EVENTS_REQUEST = 'LOAD_EVENTS_REQUEST';
const LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS';
const LOAD_EVENTS_FAIL = 'LOAD_EVENTS_FAIL';
// ADD
const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
const ADD_EVENT_FAIL = 'ADD_EVENT_FAIL';
// EDIT
const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
const EDIT_EVENT_FAIL = 'EDIT_EVENT_FAIL';
// REMOVE
const REMOVE_EVENT_REQUEST = 'REMOVE_EVENT_REQUEST';
const REMOVE_EVENT_SUCCESS = 'REMOVE_EVENT_SUCCESS';
const REMOVE_EVENT_FAIL = 'REMOVE_EVENT_FAIL';

const initialState = {
  // Loading all events
  all: [],
  loadingEvents: false,
  eventsLoaded: false,
  loadEventsError: false,
  // Adding new event
  addingEvent: false,
  eventAdded: null, // (Number) ID of an event that was just added
  addEventError: false,
  // Editing event
  editingEvent: false,
  eventEdited: false,
  editEventError: false,
  // Removing a event
  removingEvent: null, // (Number) ID of an event being removed
  eventRemoved: false,
  removeEventError: false
};

// --- ACTIONS ---
// LOAD
export function loadEvents() {
  return {
    requestName: 'Load events',
    types: [LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAIL],
    promise: client => client.get('/event/loadEvents')
  };
}

// ADD
export function addEvent(event) {
  return {
    requestName: 'Add event',
    types: [ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAIL],
    promise: client => client.post('/event/addEvent', { data: event })
  };
}

// EDIT
export function editEvent(event) {
  return {
    requestName: 'Edit event',
    types: [EDIT_EVENT_REQUEST, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAIL],
    payload: { eventId: event.id, event },
    promise: client => client.post('/event/updateEvent', { data: event })
  };
}

// REMOVE
export function removeEvent(eventId) {
  return {
    requestName: 'Remove event',
    types: [REMOVE_EVENT_REQUEST, REMOVE_EVENT_SUCCESS, REMOVE_EVENT_FAIL],
    payload: { eventId },
    promise: client => client.post('/event/removeEvent', { data: { id: eventId } })
  };
}

// --- REDUCER ---
export default (state = initialState, action = {}) => {
  switch (action.type) {
    // LOAD
    case LOAD_EVENTS_REQUEST:
      return {
        ...state,
        eventsLoaded: false,
        loadingEvents: true,
        loadEventsError: false
      };
    case LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        all: action.result.message,
        loadingEvents: false,
        eventsLoaded: true
      };
    case LOAD_EVENTS_FAIL:
      return {
        ...state,
        loadingEvents: false,
        eventsLoaded: false,
        loadEventsError: true
      };
    // ADD
    case ADD_EVENT_REQUEST:
      return {
        ...state,
        eventAdded: null,
        addingEvent: true,
        addEventError: false
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        all: [
          ...state.all,
          action.result.message
        ],
        addingEvent: false,
        eventAdded: action.result.message.id
      };
    case ADD_EVENT_FAIL:
      return {
        ...state,
        addingEvent: false,
        eventAdded: null,
        addEventError: true
      };
    // EDIT
    case EDIT_EVENT_REQUEST:
      return {
        ...state,
        eventEdited: false,
        editingEvent: true,
        editEventError: false
      };
    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        all: state.all.map(event => event.id === action.payload.eventId ? action.payload.event : event),
        editingEvent: false,
        eventEdited: true
      };
    case EDIT_EVENT_FAIL:
      return {
        ...state,
        editingEvent: false,
        eventEdited: false,
        editEventError: true
      };
    // REMOVE
    case REMOVE_EVENT_REQUEST:
      return {
        ...state,
        eventRemoved: false,
        removingEvent: action.payload.eventId,
        removeEventError: false
      };
    case REMOVE_EVENT_SUCCESS:
      return {
        ...state,
        all: state.all.filter(event => event.id !== action.payload.eventId),
        removingEvent: null,
        eventRemoved: true
      };
    case REMOVE_EVENT_FAIL:
      return {
        ...state,
        removingEvent: null,
        eventRemoved: false,
        removeEventError: true
      };
    default:
      return state;
  }
};
