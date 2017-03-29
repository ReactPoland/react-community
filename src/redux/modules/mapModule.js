// --- LOAD ---
const LOAD_MAP_MARKERS = 'LOAD_MAP_MARKERS';
const LOAD_MAP_MARKERS_SUCCESS = 'LOAD_MAP_MARKERS_SUCCESS';
const LOAD_MAP_MARKERS_FAIL = 'LOAD_MAP_MARKERS_FAIL';
const CLEAR_LOAD_MAP_MARKERS_ERROR = 'CLEAR_LOAD_MAP_MARKERS_ERROR';
// --- ADD ---
const ADD_MAP_MARKER = 'ADD_MAP_MARKER';
const ADD_MAP_MARKER_SUCCESS = 'ADD_MAP_MARKER_SUCCESS';
const ADD_MAP_MARKER_FAIL = 'ADD_MAP_MARKER_FAIL';
const CLEAR_ADD_MAP_MARKER_ERROR = 'CLEAR_ADD_MAP_MARKER_ERROR';
// --- REMOVE ---
const REMOVE_MAP_MARKER = 'REMOVE_MAP_MARKER';
const REMOVE_MAP_MARKER_SUCCESS = 'REMOVE_MAP_MARKER_SUCCESS';
const REMOVE_MAP_MARKER_FAIL = 'REMOVE_MAP_MARKER_FAIL';
const CLEAR_REMOVE_MAP_MARKER_ERROR = 'CLEAR_REMOVE_MAP_MARKER_ERROR';

const initialState = {
  // Loading all markers
  markers: [],
  loadingMarkers: false,
  markersLoaded: false,
  loadMapMarkersError: '',
  // Adding new marker
  addingMarker: false,
  markerAdded: false,
  addMarkerError: '',
  // Removing a marker
  removingMarker: null, // ID of a marker being removed
  markerRemoved: false,
  removeMarkerError: ''
};

export default function articleModule(state = initialState, action = {}) {
  switch (action.type) {
    // --- LOAD ---
    case LOAD_MAP_MARKERS:
      return {
        ...state,
        markersLoaded: false,
        loadingMarkers: true,
        loadMapMarkersError: ''
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
        markersLoaded: false,
        loadMapMarkersError: action.error
      };
    case CLEAR_LOAD_MAP_MARKERS_ERROR:
      return {
        ...state,
        loadMapMarkersError: ''
      };
      // --- ADD ---
    // --- ADD ---
    case ADD_MAP_MARKER:
      return {
        ...state,
        markerAdded: false,
        addingMarker: true,
        addMarkerError: ''
      };
    case ADD_MAP_MARKER_SUCCESS:
      return {
        ...state,
        markers: [
          ...state.markers,
          action.result.message
        ],
        addingMarker: false,
        markerAdded: true
      };
    case ADD_MAP_MARKER_FAIL:
      return {
        ...state,
        addingMarker: false,
        markerAdded: false,
        addMarkerError: action.error
      };
    case CLEAR_ADD_MAP_MARKER_ERROR:
      return {
        ...state,
        addMarkerError: ''
      };
    // --- REMOVE ---
    case REMOVE_MAP_MARKER:
      return {
        ...state,
        markerRemoved: false,
        removingMarker: action.payload.markerId,
        removeMarkerError: ''
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
        markerRemoved: false,
        removeMarkerError: action.error
      };
    case CLEAR_REMOVE_MAP_MARKER_ERROR:
      return {
        ...state,
        removeMarkerError: ''
      };
    default:
      return state;
  }
}

// --- LOAD ---
export function loadMarkers() {
  return {
    types: [LOAD_MAP_MARKERS, LOAD_MAP_MARKERS_SUCCESS, LOAD_MAP_MARKERS_FAIL],
    promise: client => client.get('/map/loadMarkers')
  };
}

export const clearLoadMapMarkersError = () => ({ type: CLEAR_LOAD_MAP_MARKERS_ERROR });

// -- ADD ---
export function addMarker(marker) {
  return {
    types: [ADD_MAP_MARKER, ADD_MAP_MARKER_SUCCESS, ADD_MAP_MARKER_FAIL],
    promise: client => client.post('/map/addMarker', { data: marker })
  };
}

export const clearAddMapMarkerError = () => ({ type: CLEAR_ADD_MAP_MARKER_ERROR });

// --- REMOVE ---
export function removeMarker(markerId) {
  return {
    types: [REMOVE_MAP_MARKER, REMOVE_MAP_MARKER_SUCCESS, REMOVE_MAP_MARKER_FAIL],
    payload: { markerId },
    promise: client => client.post('/map/removeMarker', { data: { id: markerId } })
  };
}

export const clearRemoveMarkerError = () => ({ type: CLEAR_REMOVE_MAP_MARKER_ERROR });
