import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div>
  
      {object ? (
        object.error ? (
          <p>{object.error}</p>
        ) : (
          <div >
            <img src={object.image} alt={object.name} 
            // onError={(e) => {
            //     console.error("Image failed to load:", e.target.src);
            //     e.target.onerror = null; 
            //     e.target.src = "/path-to-fallback-image.jpg";}} 
            />
            <img src={object.image1} />
            <img src={object.image2} />
            <img src={object.image3} />
            <div>
            <h1>{object.name}</h1>
            <h3>{object.description}</h3>
            <p>{object.price} $</p>

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

export default ObjectDetail;
