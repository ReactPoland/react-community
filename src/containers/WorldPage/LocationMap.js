import React, { PropTypes } from 'react';
import { Map, TileLayer } from 'react-leaflet-universal';
import MapMarker from './MapMarker';

const LocationMap = (props) => {
  const styles = require('./WorldPage.scss');

  return (
    <Map
      className={styles.LocationMap}
      center={props.centerCoords}
      zoom={props.zoomLevel}
      zoomControl={!(props.noZoom || props.static)}
      attributionControl={!props.static}
      dragging={!props.static}
      touchZoom={!props.static}
      scrollWheelZoom={!props.static}
      minZoom={props.static ? 1 : 3}
      maxBounds={[[-90, -180], [90, 180]]} // Prevents scrolling outside map edges
      style={props.style}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {
        props.markers.map((marker) => (
          <MapMarker
            key={marker.id}
            marker={marker}
            removeMarker={props.removeMarker}
            removingMarker={props.removingMarker}
            loggedIn={props.loggedIn}
          />
        ))
      }
    </Map>
  );
};

LocationMap.propTypes = {
  centerCoords: PropTypes.array,
  zoomLevel: PropTypes.number,
  markers: PropTypes.array,
  removeMarker: PropTypes.func,
  removingMarker: PropTypes.number,
  style: PropTypes.object,
  noZoom: PropTypes.bool,
  static: PropTypes.bool,
  loggedIn: PropTypes.bool
};

LocationMap.defaultProps = {
  centerCoords: [46, 2],
  zoomLevel: 2,
  markers: [],
  removeMarker: () => {},
  removingMarker: -1,
  style: {},
  noZoom: false,
  static: false
};


export default LocationMap;
