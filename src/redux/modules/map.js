const LOAD_MAP_MARKERS = 'redux-example/LOAD_MAP_MARKERS';
const LOAD_MAP_MARKERS_SUCCESS = 'redux-example/LOAD_MAP_MARKERS_SUCCESS';
const LOAD_MAP_MARKERS_FAIL = 'redux-example/LOAD_MAP_MARKERS_FAIL';
const ADD_MAP_MARKER = 'redux-example/ADD_MAP_MARKER';
const ADD_MAP_MARKER_SUCCESS = 'redux-example/ADD_MAP_MARKER_SUCCESS';
const ADD_MAP_MARKER_FAIL = 'redux-example/ADD_MAP_MARKER_FAIL';

const initialState = {
  loadingMarkers: false,
  markersLoaded: false,
  markers: [],
  addingMarker: false,
  markerAdded: false,
  error: ''
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_MAP_MARKERS:
      return {
        ...state,
        loadingMarkers: true
      };
    case LOAD_MAP_MARKERS_SUCCESS:
      return {
        ...state,
        loadingMarkers: false,
        markersLoaded: true,
        markers: action.result,
        error: ''
      };
    case LOAD_MAP_MARKERS_FAIL:
      return {
        ...state,
        loadingMarkers: false,
        markersLoaded: false,
        error: action.error
      };
    case ADD_MAP_MARKER:
      return {
        ...state,
        addingMarker: true
      };
    case ADD_MAP_MARKER_SUCCESS:
      return {
        ...state,
        addingMarker: false,
        markerAdded: true,
        error: ''
      };
    case ADD_MAP_MARKER_FAIL:
      return {
        ...state,
        addingMarker: false,
        markerAdded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function areMarkersLoaded(globalState) {
  return globalState.map && globalState.map.markersLoaded;
}

export function loadMarkers() {
  return {
    types: [LOAD_MAP_MARKERS, LOAD_MAP_MARKERS_SUCCESS, LOAD_MAP_MARKERS_FAIL],
    promise: client => client.get('/map/loadMarkers')
  };
}

export function addMarker(marker) {
  console.warn('xxx ACTION addMarker');
  return {
    types: [ADD_MAP_MARKER, ADD_MAP_MARKER_SUCCESS, ADD_MAP_MARKER_FAIL],
    id: Date.now(),
    promise: (client) => client.post('/map/addMarker', {
      data: marker
    })
  };
}
