import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Objects = () => {
  const [objects, setObjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3232/objects');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setObjects(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching objects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='objects-container'>
      {objects && objects.length > 0 ? (
        objects.map((item) => (
          <NavLink to={`/object/${item._id}`} key={item._id}>
            <div className='object'>
              <img src={item.image} alt={item.name} />
              <div className='object-details'>
                <h1>{item.name}</h1>
                <h3>{item.description.slice(0, 30)}...</h3>
                <p>{item.price} $</p>
              </div>
            </div>
          </NavLink>
        ))
      ) : (
        <div>No objects found</div>
      )}
    </div>
  );
};

export default Objects;
