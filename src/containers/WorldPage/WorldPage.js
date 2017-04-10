import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _last from 'lodash/last';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  loadMarkers, removeMarker, addMarker, clearLoadMapMarkersError,
  clearAddMapMarkerError, clearRemoveMarkerError
} from 'redux/modules/mapModule';
import { LoadingScreen, ErrorSnackbar } from 'components';

import AddLocationDialog from './AddLocationDialog';
import LocationMap from './LocationMap';

const mappedState = ({ map }) => ({
  mapMarkers: map.markers,
  loadMapMarkersError: map.loadMapMarkersError,
  markersLoaded: map.markersLoaded,
  loadingMarkers: map.loadingMarkers,
  addingMarker: map.addingMarker,
  markerAdded: map.markerAdded,
  addMarkerError: map.addMarkerError,
  removingMarker: map.removingMarker,
  removeMarkerError: map.removeMarkerError
});

const mappedActions = {
  loadMarkers,
  addMarker,
  removeMarker,
  clearLoadMapMarkersError,
  clearAddMapMarkerError,
  clearRemoveMarkerError
};

@connect(mappedState, mappedActions)
export default class WorldPage extends Component {
  static propTypes = {
    mapMarkers: PropTypes.array.isRequired,
    loadMapMarkersError: PropTypes.string,
    markersLoaded: PropTypes.bool.isRequired,
    loadingMarkers: PropTypes.bool.isRequired,
    addingMarker: PropTypes.bool.isRequired,
    markerAdded: PropTypes.bool.isRequired,
    removingMarker: PropTypes.number,
    addMarkerError: PropTypes.string,
    loadMarkers: PropTypes.func.isRequired,
    addMarker: PropTypes.func.isRequired,
    removeMarker: PropTypes.func.isRequired,
    clearLoadMapMarkersError: PropTypes.func.isRequired,
    clearAddMapMarkerError: PropTypes.func.isRequired,
    removeMarkerError: PropTypes.string,
    clearRemoveMarkerError: PropTypes.func.isRequired
  }

  state = {
    showAddLocationDialog: false, // Shows popup for adding localization to the map
    mapCenterCoord: [0, 0],
    mapZoomLevel: 3
  }

  componentWillMount() {
    // Fetch markers from API
    if (!this.props.markersLoaded) this.props.loadMarkers();
  }

  componentWillReceiveProps(nextProps) {
    // If we successfully got a new marker, center the map view on it
    if (!this.props.markerAdded && nextProps.markerAdded) {
      const lastMarker = _last(nextProps.mapMarkers);

      this.setState({
        mapZoomLevel: 10,
        mapCenterCoord: [lastMarker.lat, lastMarker.lng]
      });
    }
  }

  openAddLocationDialog = () => {
    this.setState({ showAddLocationDialog: true });
  }

  closeAddLocationDialog = () => {
    this.setState({ showAddLocationDialog: false });
  }

  // Adds new marker to the map and centers the view on it
  addMarker = markerData => {
    const lat = markerData.location.geometry.location.lat();
    const lng = markerData.location.geometry.location.lng();

    const newMarker = {
      name: markerData.name,
      link: markerData.link,
      description: markerData.description,
      lat,
      lng
    };

    this.props.addMarker(newMarker);
  }

  removeMarker = markerId => {
    this.props.removeMarker(markerId);
  }

  render() {
    const {
      mapMarkers, loadMapMarkersError, loadingMarkers, addingMarker,
      markerAdded, addMarkerError, removingMarker, removeMarkerError
    } = this.props;
    const { showAddLocationDialog, mapCenterCoord, mapZoomLevel } = this.state;
    const styles = require('./WorldPage.scss');

    const AddMarkerButton = (
      <FloatingActionButton
        className={styles.AddMarkerButton}
        onClick={this.openAddLocationDialog}
      >
        <ContentAdd />
      </FloatingActionButton>
    );

    return (
      <LoadingScreen loading={loadingMarkers}>
        <div className={styles.WorldPage}>
          {AddMarkerButton}
          <LocationMap
            centerCoords={mapCenterCoord}
            zoomLevel={mapZoomLevel}
            markers={mapMarkers}
            removeMarker={this.removeMarker}
            removingMarker={removingMarker}
          />
          <AddLocationDialog
            popupVisible={showAddLocationDialog}
            closePopup={this.closeAddLocationDialog}
            addMarker={this.addMarker}
            addingMarker={addingMarker}
            markerAdded={markerAdded}
            errorMessage={addMarkerError}
            clearError={this.props.clearAddMapMarkerError}
          />
          <ErrorSnackbar
            open={loadMapMarkersError !== null}
            message={loadMapMarkersError}
            onRequestClose={this.props.clearLoadMapMarkersError}
          />
          <ErrorSnackbar
            open={removeMarkerError !== null}
            message={removeMarkerError}
            onRequestClose={this.props.clearRemoveMarkerError}
          />
        </div>
      </LoadingScreen>
    );
  }
}
