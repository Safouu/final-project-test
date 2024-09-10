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

<<<<<<< HEAD
        
=======
    //     if (data && data.name && data.description && data.googleMapsUrl) {
    //       const infoWindow = new window.google.maps.InfoWindow({
    //         content: `
    //           <div>
    //             <h3>${data.name}</h3>
    //             <p>${data.description}</p>
    //             <a href="${data.googleMapsUrl}" target="_blank" rel="noopener noreferrer">
    //               View on Google Maps
    //             </a>
    //           </div>`,
    //       });

    //       marker.addListener('click', () => {
    //         infoWindow.open(newMap, marker);
    //       });
    //     } else {
    //       console.error('Map data is undefined or missing required fields.');
    //     }
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
  
=======

>>>>>>> refs/remotes/origin/main
};

export default Map;
