import React, { PropTypes } from 'react';
import { Map, TileLayer } from 'react-leaflet-universal';
import MapMarker from './MapMarker';

const LocalizationMap = props => {
  const styles = require('./WorldPage.scss');

  return (
    <Map
      className={styles.LocalizationMap}
      center={props.centerCoords}
      zoom={props.zoomLevel}
      minZoom={3}
      maxBounds={[[-90, -180], [90, 180]]} // Prevents scrolling outside map edges
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      { props.markers.map((marker, index) => <MapMarker key={index} marker={marker} />) }
    </Map>
  );
};

LocalizationMap.propTypes = {
  centerCoords: PropTypes.array.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  markers: PropTypes.array.isRequired
};

export default LocalizationMap;
