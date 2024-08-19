import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams


const ObjectDetail = () => {
  const { id } = useParams(); // Access the route parameter (id)
  const [object, setObject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3232/objects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setObject(data);
        console.log('Fetched object:', data);
        console.log('Image URL:', data.image);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setObject({ error: 'Failed to load object details' });
      });
  }, [id]);



  return (
    <div className='object-detail'>
      {object ? (
        object.error ? (
          <p>{object.error}</p>
        ) : (
          <div>
            <img 
              src={object.image} 
              alt={object.name} 
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.onerror = null; 
                e.target.src = "/path-to-fallback-image.jpg"; 
              }} 
            />
            <h1>{object.name}</h1>
            <h3>{object.description}</h3>
            <h4>{object.price} $</h4>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ObjectDetail;
