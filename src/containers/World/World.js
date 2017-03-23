import React, { Component } from 'react';
import _random from 'lodash/random';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddLocalizationPopup from './AddLocalizationPopup';
import LocalizationMap from './LocalizationMap';

export default class World extends Component {
  constructor() {
    super();
    this.state = {
      showMap: false, // Used as a fix for map not centering properly
      showPopup: false, // Shows popup for adding localization to the map
      markers: [
        { lat: 51.505, lng: -0.09 }
      ]
    };
  }

  componentDidMount() {
    // TODO: This is an ugly way to ensure that map centers after page loads
    setTimeout(() => { this.setState({ showMap: true }); });
  }

  openEntryPopup = () => {
    this.setState({ showPopup: true });
  }

  closeEntryPopup = () => {
    this.setState({ showPopup: false });
  }

  addMarker = () => {
    const markers = [...this.state.markers];
    markers.push({ lat: _random(51.490, 51.530), lng: _random(-0.00, -0.20) });
    this.setState({ markers });
  }

  render() {
    const { showPopup, showMap, markers } = this.state;
    const styles = require('./World.scss');

    return (
      <div className={styles.worldPage}>
        <FloatingActionButton
          className={styles.addMarkerButton}
          onClick={this.openEntryPopup}
        >
          <ContentAdd />
        </FloatingActionButton>
        {
          showMap &&
            <LocalizationMap
              className={styles.localizationMap}
              centerCoords={[0, 0]}
              zoomLevel={3}
              markers={markers}
            />
        }
        <AddLocalizationPopup
          popupVisible={showPopup}
          closePopup={this.closeEntryPopup}
        />
      </div>
    );
  }
}
