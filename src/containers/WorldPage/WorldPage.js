import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Snackbar from 'material-ui/Snackbar';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { addMarker, loadMarkers } from 'redux/modules/map';
import { Spinner } from '../../components';
import AddLocationDialog from './AddLocationDialog';
import LocationMap from './LocationMap';

const mappedState = ({ map }) => ({
  mapMarkers: map.markers,
  errorMessage: map.error,
  markersLoaded: map.markersLoaded,
  loadingMarkers: map.loadingMarkers
});

const mappedActions = {
  addMarker,
  loadMarkers
};

@connect(mappedState, mappedActions)
export default class WorldPage extends Component {
  static propTypes = {
    mapMarkers: PropTypes.array.isRequired,
    errorMessage: PropTypes.string.isRequired,
    markersLoaded: PropTypes.bool.isRequired,
    loadingMarkers: PropTypes.bool.isRequired,
    addMarker: PropTypes.func.isRequired,
    loadMarkers: PropTypes.func.isRequired
  }

  state = {
    showAddLocationDialog: false, // Shows popup for adding localization to the map
    mapCenterCoord: [0, 0],
    mapZoomLevel: 3
  }

  componentWillMount() {
    if (!this.props.markersLoaded) this.props.loadMarkers();
  }

  openEntryPopup = () => {
    this.setState({ showAddLocationDialog: true });
  }

  closeEntryPopup = () => {
    this.setState({ showAddLocationDialog: false });
  }

  // Adds new marker to the map and centers the view on it
  // TODO: for now it saves them in components state, eventually they'll be
  // stored in the database
  addMarker = markerData => {
    const markers = [...this.state.markers];
    const lat = markerData.location.geometry.location.lat();
    const lng = markerData.location.geometry.location.lng();

    const newMarker = {
      name: markerData.name,
      link: markerData.link,
      description: markerData.description,
      lat,
      lng
    };

    markers.push(newMarker);

    this.setState({
      markers,
      mapZoomLevel: 10,
      mapCenterCoord: [lat, lng]
    });
  }

  render() {
    const { mapMarkers, errorMessage, loadingMarkers } = this.props;
    const { showAddLocationDialog, mapCenterCoord, mapZoomLevel } = this.state;
    const styles = require('./WorldPage.scss');

    if (loadingMarkers) return <Spinner />;

    const AddMarkerButton = (
      <FloatingActionButton
        className={styles.AddMarkerButton}
        onClick={this.openEntryPopup}
      >
        <ContentAdd />
      </FloatingActionButton>
    );

    return (
      <div className={styles.WorldPage}>
        {AddMarkerButton}
        <LocationMap
          centerCoords={mapCenterCoord}
          zoomLevel={mapZoomLevel}
          markers={mapMarkers}
        />
        <AddLocationDialog
          popupVisible={showAddLocationDialog}
          closePopup={this.closeEntryPopup}
          addMarker={this.addMarker}
        />
        <Snackbar
          open={errorMessage !== ''}
          message={errorMessage}
          bodyStyle={{ padding: '8px 24px', lineHeight: 1.5, height: 'auto', backgroundColor: 'red' }}
          autoHideDuration={5000}
        />
      </div>
    );
  }
}
