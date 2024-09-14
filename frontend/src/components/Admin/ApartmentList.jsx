import { useState, useEffect } from 'react';
import Map from './Map';
import { NavLink } from 'react-router-dom';

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const [editingApartment, setEditingApartment] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');  // Single price field
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showMap, setShowMap] = useState(false);

  // Fetch the objects on component load
  useEffect(() => {
    fetch('http://localhost:3232/apartment')
      .then((res) => res.json())
      .then((data) => setApartments(data));
  }, []);

  // Handle deletion of an object
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3232/apartment/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setApartments(apartments.filter((apartment) => apartment._id !== id));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle editing an object
  const handleEditApartment = (apartment) => {
    setEditingApartment(apartment);
    setName(apartment.name || '');
    setDescription(apartment.description || '');
    setPrice(apartment.price || '');  // Single price field
    setImage(apartment.image || '');
    setImagePreview(apartment.image || '');
    setLatitude(apartment.latitude || '');
    setLongitude(apartment.longitude || '');
    setShowMap(!!apartment.latitude && !!apartment.longitude);
  };

  // Handle file change (for image upload)
  const handleFileChange = (e, setImageState, setPreviewState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageState(reader.result);
        setPreviewState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission for editing/creating Apartment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedApartment = {
      name,
      description,
      price,  // Single price field
      image,
      latitude,
      longitude,
    };

    try {
      const response = await fetch(`http://localhost:3232/apartment/${editingApartment._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedApartment),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setApartments(apartments.map((apartment) =>
        apartment._id === updatedData._id ? updatedData : apartment
        ));
        setEditingApartment(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='objects-container'>
      {apartments.map((apartment) => (

        <NavLink to={`/apartment/${apartment._id}`} key={apartment._id} className='object'>
          <img src={apartment.image} alt={apartment.name} />
          <div className='object-details'>
            <h1>{apartment.name}</h1>
            <h3>{apartment.description.slice(0, 30)}...</h3>
            <p>{apartment.price} $</p>

            <button
              style={{ background: 'red', color: 'white', cursor: 'pointer', padding: '5px 10px' }}
              onClick={() => handleDelete(apartment._id)}> Delete
            </button>

            <button
              style={{ background: 'green', color: 'white', cursor: 'pointer', padding: '5px 10px' }}
              onClick={() => handleEditApartment(apartment)}> Edit
            </button>
          </div>
        </NavLink>
      ))}

      {editingApartment && (
        <div className='edit-modal'>
          <form className='add-apartment' onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text" placeholder="Object Name" value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Description</label>
            <input
              type="text" placeholder="Description" value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label>Price</label> {/* Single price field */}
            <input
              type="number" placeholder="Price" value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label>Main image</label>
            <input
              type="text" placeholder="Image URL" value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="file" accept="image/*"
              onChange={(e) => handleFileChange(e, setImage, setImagePreview)}
            />
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview} alt="Preview"
                  style={{ maxWidth: '75%', borderRadius: '8px' }}
                />
              </div>
            )}

            {/* Handling multiple image URLs as well */}
            {['image1', 'image2', 'image3', 'image4', 'image5', 'image6'].map((img, idx) => (
              <div key={idx}>
                <label>Image {idx + 1}</label>
                <input
                  type="text" placeholder={`Image URL ${idx + 1}`} value={editingApartment[img] || ''}
                  onChange={(e) => setEditingApartment(prev => ({ ...prev, [img]: e.target.value }))}
                />
                <input
                  type="file" accept="image/*"
                  onChange={(e) => handleFileChange(e, (value) => setEditingApartment(prev => ({ ...prev, [img]: value })), (value) => setEditingApartment(prev => ({ ...prev, [`${img}Preview`]: value })))}
                />
                {editingApartment[`${img}Preview`] && (
                  <div className="image-preview">
                    <img
                      src={editingApartment[`${img}Preview`]} alt="Preview"
                      style={{ maxWidth: '75%', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </div>
            ))}

            <label>Latitude</label>
            <input
              type="text" placeholder="Latitude" value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />

            <label>Longitude</label>
            <input
              type="text" placeholder="Longitude" value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />

            {showMap && <Map latitude={latitude} longitude={longitude} />}

            <button type="submit">Save</button>

            <button type="button" onClick={() => setEditingApartment(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApartmentList;
