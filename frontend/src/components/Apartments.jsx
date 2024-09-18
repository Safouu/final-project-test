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
    <div className='apartments'>

      {apartments && apartments.map((apartment) => (
        <NavLink to={`/apartment/${apartment._id}`} key={apartment._id}>
          <div className='apartment'>
            <img src={apartment.image} alt={apartment.name} />
           
          <div className='apartment-details'>
            <h1>{apartment.name}</h1>
            <p>{(apartment.description).slice(0,30)}...</p>
            <h3><span>Price</span> {apartment.price} €<span> per Night</span></h3>
          </div>

          </div>
        </NavLink>
      ))}

    </div>
  );
};

export default Apartment;