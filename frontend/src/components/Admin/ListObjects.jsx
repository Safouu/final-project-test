import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ListObject = () => {

  const [objects, setObjects] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3232/objects')
      .then((res) => res.json())
      .then((data) => {
        setObjects(data);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3232/objects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const newObjects = objects.filter((item) => item._id !== id);
        setObjects(newObjects);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='objects-container'>
      {objects && objects.map((item) => (
        <div key={item._id}>
          <NavLink to={`/object/${item._id}`}>
            <div className='object'>
              
              <img src={item.image} alt={item.name} />
              <p>{item._id}</p>
              <h1>{item.name}</h1>
              <h3>{item.description}</h3>
              <h4>{item.price} $</h4>
            </div>
          </NavLink>
          <button
            style={{ background: 'red', color: 'white', cursor: 'pointer' }}
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListObject;
