import React, { PropTypes } from 'react';
import { Marker, Popup } from 'react-leaflet-universal';

const MapMarker = ({ marker }) => {
  const styles = require('./WorldPage.scss');

  return (
    <Marker position={[marker.lat, marker.lng]}>
      <Popup>
        <div className={styles.MarkerPopup}>
          <h3>
            <a href={marker.link}>{marker.name}</a>
          </h3>
          <p>{marker.description}</p>
        </div>
      </Popup>
    </Marker>
  );
};

MapMarker.propTypes = {
  marker: PropTypes.object.isRequired
};

export default MapMarker;
