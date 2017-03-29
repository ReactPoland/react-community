import React, { PropTypes } from 'react';
import { Marker, Popup } from 'react-leaflet-universal';

const MapMarker = ({ marker, removeMarker, removingMarker }) => {
  const styles = require('./WorldPage.scss');

  const onRemoveMarker = () => {
    removeMarker(marker.id);
  };

  return (
    <Marker position={[marker.lat, marker.lng]}>
      <Popup>
        <div className={styles.MarkerPopup}>
          <h3>
            <a href={marker.link}>{marker.name}</a>
          </h3>
          <p>{marker.description}</p>
          <button
            style={{ marginTop: 10 }}
            onClick={onRemoveMarker}
            disabled={removingMarker}
          >
            {removingMarker === marker.id ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

MapMarker.propTypes = {
  marker: PropTypes.object.isRequired,
  removeMarker: PropTypes.func.isRequired,
  removingMarker: PropTypes.number
};

export default MapMarker;
