import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Map from './Admin/Map';

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3232/apartment/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setApartment(data);
        setSelectedImage(data.image);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setObject({ error: 'Failed to load the Apartment details' });
      });
      
  }, [id]);

  const handleImageClick = (imageKey) => {
    if (!apartment) return;

    const clickedImage = apartment[imageKey];
    setApartment({
      ...apartment,
      [imageKey]: selectedImage,
    });
    setSelectedImage(clickedImage);
  };

  const handleBooking = () => {
    if (!apartment) return;
    navigate('/booking', { state: { apartment } });
  };

  return (
    <div className='home'>

      <div className='apart'>
        <div className='top'>
          <p>Follow Your Dream</p>
        </div>
      </div>

      {apartment ? ( 
        apartment.error ? (
          <p>{apartment.error}</p>
        ) : (
          <div className='apartments apart-details'> 

            <img className='main-img' src={selectedImage} alt={apartment ? apartment.name : 'Apartment'} />
           
            <div className='single-images'>
              {['image1', 'image2', 'image3', 'image4', 'image5', 'image6'].map((key) => (
                <img
                  key={key}
                  src={apartment[key]}
                  alt={`Thumbnail ${key}`}
                  onClick={() => handleImageClick(key)}
                />
              ))}
            </div>

            <hr />

          <div className='apart-description'>
            <h1>{apartment.name}</h1>
            <p>{apartment.description}</p>
            <h3>{apartment.price} <span>€</span></h3>
          </div>

          <hr />

           <div className='map-container' style={{ marginTop: '20px' }}>
                <Map latitude={apartment.latitude} longitude={apartment.longitude} />
           </div>

                <button className="booking-button" onClick={handleBooking}>
                Book Now
              </button>
         </div>
            )
            ) : (
              <p>Loading...</p>
            )}
          </div> 
   
  );
};

export default ApartmentDetails;