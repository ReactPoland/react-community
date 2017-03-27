const LOAD_MAP_MARKERS = 'LOAD_MAP_MARKERS';
const LOAD_MAP_MARKERS_SUCCESS = 'LOAD_MAP_MARKERS_SUCCESS';
const LOAD_MAP_MARKERS_FAIL = 'LOAD_MAP_MARKERS_FAIL';
const ADD_MAP_MARKER = 'ADD_MAP_MARKER';
const ADD_MAP_MARKER_SUCCESS = 'ADD_MAP_MARKER_SUCCESS';
const ADD_MAP_MARKER_FAIL = 'ADD_MAP_MARKER_FAIL';
const CLEAR_LOAD_MAP_MARKERS_ERROR = 'CLEAR_LOAD_MAP_MARKERS_ERROR';
const CLEAR_ADD_MAP_MARKER_ERROR = 'CLEAR_ADD_MAP_MARKER_ERROR';

const initialState = {
  loadingMarkers: false,
  markersLoaded: false,
  markers: [],
  addingMarker: false,
  markerAdded: false,
  loadMapMarkersError: '',
  addMarkerError: ''
};

export default function mapModule(state = initialState, action = {}) {
  switch (action.type) {
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
        markers: action.result
      };
    case LOAD_MAP_MARKERS_FAIL:
      return {
        ...state,
        loadingMarkers: false,
        markersLoaded: false,
        loadMapMarkersError: action.error
      };
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
          action.result.marker
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
    case CLEAR_LOAD_MAP_MARKERS_ERROR:
      return {
        ...state,
        loadMapMarkersError: ''
      };
    case CLEAR_ADD_MAP_MARKER_ERROR:
      return {
        ...state,
        addMarkerError: ''
      };
    default:
      return state;
  }
}

export const clearLoadMapMarkersError = () => ({
  type: CLEAR_LOAD_MAP_MARKERS_ERROR
});

export const clearAddMapMarkerError = () => ({
  type: CLEAR_ADD_MAP_MARKER_ERROR
});

export function loadMarkers() {
  return {
    types: [LOAD_MAP_MARKERS, LOAD_MAP_MARKERS_SUCCESS, LOAD_MAP_MARKERS_FAIL],
    promise: client => client.get('/map/loadMarkers')
  };
}

export function addMarker(marker) {
  return {
    types: [ADD_MAP_MARKER, ADD_MAP_MARKER_SUCCESS, ADD_MAP_MARKER_FAIL],
    promise: client => client.post('/map/addMarker', { data: marker })
  };
}
