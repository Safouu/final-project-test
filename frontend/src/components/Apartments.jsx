import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Apartment = () => {
  const [apartments, setApartments] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3232/apartment')
      .then((res) => res.json())
      .then((data) => {
        setApartments(data);
      });
  }, []);

  return (
    <div className='objects-container'>
      {apartments && apartments.map((apartment) => (
        <NavLink to={`/apartment/${apartment._id}`} key={apartment._id}>
          <div className='object'>
            <img src={apartment.image} alt={apartment.name} />
           
          <div className='object-details'>
            <h1>{apartment.name}</h1>
            <h3>{(apartment.description).slice(0,30)}...</h3>
            <p>{apartment.price} $</p>
          </div>

          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Apartment;