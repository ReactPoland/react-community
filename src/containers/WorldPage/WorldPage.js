import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _last from 'lodash/last';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { loadMarkers, removeMarker, addMarker } from 'redux/modules/mapModule';
import { LoadingScreen } from 'components';

import AddLocationDialog from './AddLocationDialog';
import LocationMap from './LocationMap';

const mappedState = ({ map }) => ({
  mapMarkers: map.markers,
  markersLoaded: map.markersLoaded,
  loadingMarkers: map.loadingMarkers,
  addingMarker: map.addingMarker,
  markerAdded: map.markerAdded,
  removingMarker: map.removingMarker
});

const mappedActions = {
  loadMarkers,
  addMarker,
  removeMarker
};

@connect(mappedState, mappedActions)
export default class WorldPage extends Component {
  static propTypes = {
    mapMarkers: PropTypes.array.isRequired,
    markersLoaded: PropTypes.bool.isRequired,
    loadingMarkers: PropTypes.bool.isRequired,
    addingMarker: PropTypes.bool.isRequired,
    markerAdded: PropTypes.bool.isRequired,
    removingMarker: PropTypes.number,
    loadMarkers: PropTypes.func.isRequired,
    addMarker: PropTypes.func.isRequired,
    removeMarker: PropTypes.func.isRequired
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
    const { mapMarkers, loadingMarkers, addingMarker, markerAdded, removingMarker } = this.props;
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
          />
        </div>
      </LoadingScreen>
    );
  }
}
