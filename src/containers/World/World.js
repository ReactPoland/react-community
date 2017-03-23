import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet-universal';
import _random from 'lodash/random';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddNewEntryPopup from './AddNewEntryPopup';

export default class World extends Component {
  constructor() {
    super();
    this.state = {
      showMap: false, // Used as a fix for map not centering properly
      showPopup: false,
      mapLat: 51.505, // Main latitude
      mapLng: -0.09, // Main longitude
      zoom: 12, // Main zoom value
      markers: [
        { lat: 51.505, lng: -0.09 },
        { lat: 51.510, lng: -0.10 },
        { lat: 51.515, lng: -0.11 }
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
    const { showPopup, showMap, zoom, mapLat, mapLng, markers } = this.state;
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
          showMap && (
            <Map className={styles.map} center={[mapLat, mapLng]} zoom={zoom}>
              <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {
                markers.map((marker, index) => (
                  <Marker key={index} position={[marker.lat, marker.lng]}>
                    <Popup>
                      <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                    </Popup>
                  </Marker>
                ))
              }
            </Map>
          )
        }
        <AddNewEntryPopup
          popupVisible={showPopup}
          closePopup={this.closeEntryPopup}
        />
      </div>
    );
  }
}
