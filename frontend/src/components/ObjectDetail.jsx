import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Map from './Admin/Map';

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
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setObject({ error: 'Failed to load object details' });
      });
      
  }, [id]);

  const handleImageClick = (imageKey) => {
    if (!object) return;

    const clickedImage = object[imageKey];
    setObject({
      ...object,
      [imageKey]: selectedImage,
    });
    setSelectedImage(clickedImage);
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
                  {['image1', 'image2', 'image3', 'image4', 'image5', 'image6'].map((key) => (
                    <img
                      key={key}
                      src={object[key]}
                      alt={`Thumbnail ${key}`}
                      onClick={() => handleImageClick(key)}
                    />
                  ))}
                </div>
              </div>

              <div className='single-description'>
                <h2>{object.name}</h2>
                <p>{object.description}</p>
                <p> {object.price} $ </p>
              </div>

              {/* latitude and longitude  */}
              {object.latitude && object.longitude ? (
                <div className='map-container' style={{ marginTop: '20px' }}>
                  <Map latitude={object.latitude} longitude={object.longitude} />
                </div>
              ) : (
                <p>Location information is unavailable.</p>
              )}

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