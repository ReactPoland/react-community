import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddLocationDialog from './AddLocationDialog';
import LocationMap from './LocationMap';

export default class WorldPage extends Component {
  state = {
    showMap: false, // Used as a fix for map not centering properly
    showPopup: false, // Shows popup for adding localization to the map
    mapCenterCoord: [0, 0],
    mapZoomLevel: 3,
    markers: [
      {
        // TODO: sample data, remove in production
        name: 'Test marker name lorem ipsum sit lorem',
        link: 'http://google.com/',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        lat: 51.505, lng: -0.09
      }
    ]
  }

  componentDidMount() {
    // TODO: This is an ugly way to ensure that map centers after page loads (SSR issue)
    // Someone please find a better way to handle this 😔
    setTimeout(() => { this.setState({ showMap: true }); });
  }

  openEntryPopup = () => {
    this.setState({ showPopup: true });
  }

  closeEntryPopup = () => {
    this.setState({ showPopup: false });
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
    const { showPopup, showMap, mapCenterCoord, mapZoomLevel, markers } = this.state;
    const styles = require('./WorldPage.scss');

    const AddMarkerButton = (
      <FloatingActionButton
        className={styles.AddMarkerButton}
        onClick={this.openEntryPopup}
      >
        <ContentAdd />
      </FloatingActionButton>
    );

    if (!showMap) return null;

    return (
      <div className={styles.WorldPage}>
        {AddMarkerButton}
        <LocationMap
          centerCoords={mapCenterCoord}
          zoomLevel={mapZoomLevel}
          markers={markers}
        />
        <AddLocationDialog
          popupVisible={showPopup}
          closePopup={this.closeEntryPopup}
          addMarker={this.addMarker}
        />
      </div>
    );
  }
}
