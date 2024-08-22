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

  return (
    <div className='objects-container'>
      {objects && objects.map((item) => (
        <NavLink to={`/object/${item._id}`} key={item._id}>
          <div className='object'>
            <img src={item.image} alt={item.name} />
            <h1>{item.name}</h1>
            <h3>{item.description}</h3>
            <h4>{item.price} $</h4>
          </div>
        </NavLink>
      ))}
    </div>
  );
};


export default ListObject;
