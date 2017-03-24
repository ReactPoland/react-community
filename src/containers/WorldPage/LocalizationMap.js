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
              <div className={styles.MarkerPopup}>
                <h3>
                  <a href={marker.link}>{marker.name}</a>
                </h3>
                <p>{marker.description}</p>
              </div>
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
