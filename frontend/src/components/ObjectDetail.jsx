import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ObjectDetail = () => {

const { id } = useParams();
const [object, setObject] = useState(null);

useEffect(() => {
    fetch(`http://localhost:3232/objects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setObject(data);
        console.log(data.image);
      });
  }, [id]);


  return (
    <div className='object-detail'>

      {object ? (
        <div>
         
         <img src={object.image} alt={object.name} />

            <h1>{object.name}</h1>
            <h3>{object.description}</h3>
            <h4>{object.price} $</h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default ObjectDetail;
