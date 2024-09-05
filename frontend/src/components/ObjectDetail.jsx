import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const ObjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [object, setObject] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3232/objects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setObject(data);
        setSelectedImage(data.image); 
        /// console.log('Fetched object:', data);
        // console.log('Image URL:', data.image);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setObject({ error: 'Failed to load object details' });
      });
  }, [id]);

 
  const handleImageClick = (imageKey) => {
    if (!object) return;

    // Get the clicked image's URL
    const clickedImage = object[imageKey];

    // Swap the main image with the clicked image
    setObject({
      ...object,
      [imageKey]: selectedImage, // The clicked image's place is taken by the main image
    });
    setSelectedImage(clickedImage); // The main image is updated with the clicked image
  };


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
                <img src={selectedImage} alt={object.name} />
               </div>


               <div className='single-images'>
                  {/* Loop through image keys dynamically */}
                  {['image1', 'image2', 'image3', 'image4', 'image5', 'image6'].map((key) => (
                    <img
                      key={key}
                      src={object[key]}
                      alt={`Thumbnail ${key}`}
                      onClick={() => handleImageClick(key)}
                    />
                  ))}
                </div>
            
               {/* <div className='single-images'>
                  <img src={object.image1} onClick={() => handleImageClick(object.image1)} alt="" />
                  <img src={object.image2} onClick={() => handleImageClick(object.image2)} alt="" />
                  <img src={object.image3} onClick={() => handleImageClick(object.image3)} alt="" />
                  <img src={object.image4} onClick={() => handleImageClick(object.image4)} alt="" />
                  <img src={object.image5} onClick={() => handleImageClick(object.image5)} alt="" />
                  <img src={object.image6} onClick={() => handleImageClick(object.image6)} alt="" />
                </div> */}
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
