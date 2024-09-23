import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const loadGoogleMaps = (callback) => {
  const existingScript = document.getElementById('google-maps-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBy48P_hoMccIb9HtqBXDGKISwygIJNJP8&libraries=places`;
    script.onload = callback;
    document.body.appendChild(script);
  } else if (callback) {
    callback();
  }
};

const Map = ({ latitude, longitude }) => {
  const mapRef = useRef(null);  
  const mapInstance = useRef(null);  
  const [placeDetails, setPlaceDetails] = useState(null);  

  useEffect(() => {
    const initializeMap = () => {
      if (window.google?.maps && mapRef.current && !mapInstance.current) {
        
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
        });

        const marker = new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: mapInstance.current,
        });

       
        marker.addListener('click', () => {
          const service = new window.google.maps.places.PlacesService(mapInstance.current);
          const request = {
            location: { lat: latitude, lng: longitude },
            radius: '500',
            type: ['establishment'],
          };

          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
              const placeId = results[0].place_id;
              service.getDetails({ placeId }, (placeResult, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  console.log('Place Details:', placeResult);
                  setPlaceDetails(placeResult);  
                }
              });
            }
          });
        });
      }
    };

    loadGoogleMaps(initializeMap);
  }, [latitude, longitude]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
      
    
      {placeDetails && (
        <div style={{ marginTop: '20px' }}>
          <h3>Place Details</h3>
          <p><strong>Name:</strong> {placeDetails.name}</p>
          <p><strong>Address:</strong> {placeDetails.formatted_address}</p>
          <p><strong>Rating:</strong> {placeDetails.rating}</p>
          <p><strong>Website:</strong> {placeDetails.website}</p>
        </div>
      )}
    </div>
  );
};

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default Map;
