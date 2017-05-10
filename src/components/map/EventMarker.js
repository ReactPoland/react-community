import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet-universal';
import styles from './Map.scss';

const EventMarker = ({ marker }) => {
  return (
    <Marker position={[marker.lat, marker.lng]}>
      <Popup>
        <div className={styles.MarkerPopup}>
          <h3>
            <a href={marker.link}>{marker.title}</a>
          </h3>
          <p>{marker.description}</p>
        </div>
      </Popup>
    </Marker>
  );
};

EventMarker.propTypes = {
  marker: PropTypes.object.isRequired
};

export default EventMarker;
