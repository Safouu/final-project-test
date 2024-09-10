import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const loadGoogleMaps = (callback) => {
  const existingScript = document.getElementById('google-maps-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBy48P_hoMccIb9HtqBXDGKISwygIJNJP8`;
    script.onload = callback;
    document.body.appendChild(script);
  } else if (callback) {
    callback();
  }
};

const Map = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = () => {

      // console.log(data);

      if (window.google?.maps && mapRef.current) {
        const newMap = new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
        });

        setMap(newMap);

        const marker = new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: newMap,
        });

      }
    };

    loadGoogleMaps(initializeMap);
  }, [latitude, longitude]);

  return (
    <div>
      
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,

};

export default Map;
