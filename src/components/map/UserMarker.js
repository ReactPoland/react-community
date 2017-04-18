import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet-universal';
import styles from './Map.scss';

const UserMarker = ({ marker, removeMarker, removingMarker, loggedIn }) => {
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
          {loggedIn && <button
            style={{ marginTop: 10 }}
            onClick={onRemoveMarker}
            disabled={removingMarker}
          >
            {removingMarker === marker.id ? 'Removing...' : 'Remove'}
          </button>}
        </div>
      </Popup>
    </Marker>
  );
};

UserMarker.propTypes = {
  marker: PropTypes.object.isRequired,
  removeMarker: PropTypes.func.isRequired,
  removingMarker: PropTypes.number,
  loggedIn: PropTypes.bool
};

export default UserMarker;
