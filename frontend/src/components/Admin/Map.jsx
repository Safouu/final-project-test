import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Map = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (latitude && longitude) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        map: map,
      });
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default Map;