import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const ObjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [object, setObject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3232/objects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setObject(data);
        // console.log('Fetched object:', data);
        // console.log('Image URL:', data.image);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setObject({ error: 'Failed to load object details' });
      });
  }, [id]);

  const handleBooking = () => {
    if (!object) return;
    navigate('/booking', { state: { object } });
  };
  

  return (
    <div className='home'> 
    <div className='apart-details'>
  
      {object ? (
        object.error ? (
          <p>{object.error}</p>
        ) : (
          <div className='single-apart'>

            <div className='single-top'>
               <div className='single-main-img'>
                <img src={object.image} alt={object.name} />
               </div>

               <div className='single-images'>
                 <img src={object.image1} />
                 <img src={object.image2} />
                 <img src={object.image3} />
               </div>
               
            </div>


            <div className='single-description'>
              <h2>{object.name}</h2>
              <p>{object.description}</p>
              <p>{object.price} $</p>
            </div>

          

  {/* Google Maps Karte
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript> */}

            <button className="booking-button" onClick={handleBooking}>
              Book Now
          </button>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default ObjectDetail;
