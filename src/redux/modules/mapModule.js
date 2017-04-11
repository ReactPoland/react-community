// --- ACTION TYPES ---
// LOAD
const LOAD_MAP_MARKERS_REQUEST = 'LOAD_MAP_MARKERS_REQUEST';
const LOAD_MAP_MARKERS_SUCCESS = 'LOAD_MAP_MARKERS_SUCCESS';
const LOAD_MAP_MARKERS_FAIL = 'LOAD_MAP_MARKERS_FAIL';
// ADD
const ADD_MAP_MARKER_REQUEST = 'ADD_MAP_MARKER_REQUEST';
const ADD_MAP_MARKER_SUCCESS = 'ADD_MAP_MARKER_SUCCESS';
const ADD_MAP_MARKER_FAIL = 'ADD_MAP_MARKER_FAIL';
// REMOVE
const REMOVE_MAP_MARKER_REQUEST = 'REMOVE_MAP_MARKER_REQUEST';
const REMOVE_MAP_MARKER_SUCCESS = 'REMOVE_MAP_MARKER_SUCCESS';
const REMOVE_MAP_MARKER_FAIL = 'REMOVE_MAP_MARKER_FAIL';

const initialState = {
  markers: [],
  loadingMarkers: false,
  markersLoaded: false,
  addingMarker: false,
  markerAdded: false,
  removingMarker: null, // ID of a marker being removed
  markerRemoved: false
};

// --- ACTIONS ---
// LOAD
export const loadMarkers = () => ({
  requestName: 'Load map markers',
  types: [LOAD_MAP_MARKERS_REQUEST, LOAD_MAP_MARKERS_SUCCESS, LOAD_MAP_MARKERS_FAIL],
  promise: client => client.get('/map/loadMarkers')
});

// ADD
export const addMarker = (marker) => ({
  requestName: 'Add map marker',
  types: [ADD_MAP_MARKER_REQUEST, ADD_MAP_MARKER_SUCCESS, ADD_MAP_MARKER_FAIL],
  promise: client => client.post('/map/addMarker', { data: marker })
});

// REMOVE
export const removeMarker = (markerId) => ({
  requestName: 'Remove map marker',
  types: [REMOVE_MAP_MARKER_REQUEST, REMOVE_MAP_MARKER_SUCCESS, REMOVE_MAP_MARKER_FAIL],
  promise: client => client.post('/map/removeMarker', { data: { id: markerId } }),
  payload: { markerId }
});

// -- REDUCER --
export default (state = initialState, action = {}) => {
  switch (action.type) {
    // LOAD
    case LOAD_MAP_MARKERS_REQUEST:
      return {
        ...state,
        markersLoaded: false,
        loadingMarkers: true
      };
    case LOAD_MAP_MARKERS_SUCCESS:
      return {
        ...state,
        loadingMarkers: false,
        markersLoaded: true,
        markers: action.result.message
      };
    case LOAD_MAP_MARKERS_FAIL:
      return {
        ...state,
        loadingMarkers: false,
        markersLoaded: false
      };
    // ADD
    case ADD_MAP_MARKER_REQUEST:
      return {
        ...state,
        markerAdded: false,
        addingMarker: true
      };
    case ADD_MAP_MARKER_SUCCESS:
      return {
        ...state,
        markers: [...state.markers, action.result.message],
        addingMarker: false,
        markerAdded: true
      };
    case ADD_MAP_MARKER_FAIL:
      return {
        ...state,
        addingMarker: false,
        markerAdded: false
      };
    // REMOVE
    case REMOVE_MAP_MARKER_REQUEST:
      return {
        ...state,
        markerRemoved: false,
        removingMarker: action.payload.markerId
      };
    case REMOVE_MAP_MARKER_SUCCESS:
      return {
        ...state,
        markers: state.markers.filter(marker => marker.id !== action.payload.markerId),
        removingMarker: null,
        markerRemoved: true
      };
    case REMOVE_MAP_MARKER_FAIL:
      return {
        ...state,
        removingMarker: null,
        markerRemoved: false
      };
    default:
      return state;
  }
};
