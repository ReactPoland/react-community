import React, { Component } from 'react';
import { Map, Marker, Popup } from 'react-leaflet-universal';

const position = [51.505, -0.09];

export default class World extends Component {
  render() {
    const styles = require('./World.scss');

    return (
      <div className={styles.worldPage}>
        <h1>World</h1>
        <p>Here will be the map component</p>
        <Map className={styles.map} center={position} zoom={13}>
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}
