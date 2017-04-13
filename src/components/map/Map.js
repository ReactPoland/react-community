import React, { PropTypes } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet-universal';
import UserMarker from './UserMarker';
import EventMarker from './EventMarker';
import styles from './Map.scss';

const Map = (props) => {
  let markers = [];

  if (props.type === 'users') {
    markers = props.markers.map((marker) => (
      <UserMarker
        key={marker.id}
        marker={marker}
        removeMarker={props.removeMarker}
        removingMarker={props.removingMarker}
        loggedIn={props.loggedIn}
      />
    ));
  }

  if (props.type === 'events') {
    markers = props.markers.map((marker) => (
      <EventMarker
        key={marker.id}
        marker={marker}
      />
    ));
  }

  return (
    <LeafletMap
      className={styles.Map}
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
      {markers}
    </LeafletMap>
  );
};

Map.propTypes = {
  centerCoords: PropTypes.array,
  zoomLevel: PropTypes.number,
  markers: PropTypes.array,
  removeMarker: PropTypes.func,
  removingMarker: PropTypes.number,
  style: PropTypes.object,
  noZoom: PropTypes.bool,
  static: PropTypes.bool,
  loggedIn: PropTypes.bool,
  type: PropTypes.string
};

Map.defaultProps = {
  centerCoords: [46, 2],
  zoomLevel: 2,
  markers: [],
  removeMarker: () => {},
  removingMarker: -1,
  style: {},
  noZoom: false,
  static: false,
  type: 'default'
};


export default Map;
