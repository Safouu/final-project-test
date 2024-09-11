import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Map from './Admin/Map';

const ObjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [object, setObject] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3232/objects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setObject(data);
        setSelectedImage(data.image); 
        /// console.log('Fetched object:', data);
        // console.log('Image URL:', data.image);

        const today = new Date();
        const price = data.prices.find(p => new Date(p.startDate) <= today && new Date(p.endDate) >= today);
        setCurrentPrice(price ? price.price : 'N/A');
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

  // Function to format dates to Day and Month
  const formatDate = (dateStr) => {
    const options = { day: '2-digit', month: '2-digit' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
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
              <p>Current Price: {currentPrice} $</p>
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