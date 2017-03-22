import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet-universal';

export default class World extends Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      showMap: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showMap: true });
    }, 1000);
  }

  render() {
    const styles = require('./World.scss');
    const position = [this.state.lat, this.state.lng];

    return (
      <div className={styles.worldPage}>
        <h1>World</h1>
        <p>Here will be the map component</p>
        {
          this.state.showMap && (
            <Map className={styles.map} center={position} zoom={this.state.zoom}>
              <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                </Popup>
              </Marker>
            </Map>
          )
        }
      </div>
    );
  }
}
