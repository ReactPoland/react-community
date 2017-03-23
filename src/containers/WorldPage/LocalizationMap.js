import React, { PropTypes } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet-universal';

const LocalizationMap = props => {
  const styles = require('./WorldPage.scss');

  return (
    <Map className={styles.LocalizationMap} center={props.centerCoords} zoom={props.zoomLevel}>
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {
        props.markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        ))
      }
    </Map>
  );
};

LocalizationMap.propTypes = {
  centerCoords: PropTypes.array.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  markers: PropTypes.array.isRequired
};

export default LocalizationMap;
