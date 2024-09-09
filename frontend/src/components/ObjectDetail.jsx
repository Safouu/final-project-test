import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


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
            
              </div>


            <div className='single-description'>
              <h2>{object.name}</h2>
              <p>{object.description}</p>
              <p>{object.price} $</p>
            </div>



      {/* Google Maps Embed using Place ID */}
         <div className='map-container' style={{ marginTop: '20px' }}>
                <iframe
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBy48P_hoMccIb9HtqBXDGKISwygIJNJP8&q=place_id:${object.placeId}`}>
   </iframe>
              </div>



{/*       
            <div className='map-container' style={{ marginTop: '20px' }}>
                <iframe
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=AIzaSyDxn_CbsnecByoqOS6qQ6CRZCk-j4wOyNw" ></iframe>
              </div> */}

         

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
