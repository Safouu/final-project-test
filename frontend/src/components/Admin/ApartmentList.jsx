import { useState, useEffect } from 'react';
import Map from './Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const [editingApartment, setEditingApartment] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState({
    image: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    image6: '',
  });
  const [imagePreviews, setImagePreviews] = useState({
    imagePreview: '',
    image1Preview: '',
    image2Preview: '',
    image3Preview: '',
    image4Preview: '',
    image5Preview: '',
    image6Preview: '',
  });
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3232/apartment')
      .then((res) => res.json())
      .then((data) => setApartments(data));
  }, []);

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

  const handleEditApartment = (apartment) => {
    setEditingApartment(apartment);
    setName(apartment.name || '');
    setDescription(apartment.description || '');
    setPrice(apartment.price || '');
    setImages({
      image: apartment.image || '',
      image1: apartment.image1 || '',
      image2: apartment.image2 || '',
      image3: apartment.image3 || '',
      image4: apartment.image4 || '',
      image5: apartment.image5 || '',
      image6: apartment.image6 || '',
    });
    setImagePreviews({
      imagePreview: apartment.image || '',
      image1Preview: apartment.image1 || '',
      image2Preview: apartment.image2 || '',
      image3Preview: apartment.image3 || '',
      image4Preview: apartment.image4 || '',
      image5Preview: apartment.image5 || '',
      image6Preview: apartment.image6 || '',
    });
    setLatitude(apartment.latitude || '');
    setLongitude(apartment.longitude || '');
    setShowMap(!!apartment.latitude && !!apartment.longitude);
  };

  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => ({ ...prev, [imageKey]: reader.result }));
        setImagePreviews(prev => ({ ...prev, [`${imageKey}Preview`]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedApartment = {
      name,
      description,
      price,
      image: images.image,
      image1: images.image1,
      image2: images.image2,
      image3: images.image3,
      image4: images.image4,
      image5: images.image5,
      image6: images.image6,
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
    <div className='apartments'>
      {apartments && apartments.map((apartment) => (
        <div key={apartment._id}>
          <div className='admin-apartment'>
            <img src={apartment.image} alt={apartment.name} />
            <div className='apartment-details'>
              <h1>{apartment.name}</h1>
              <p>{(apartment.description).slice(0, 30)}...</p>
              <h3>{apartment.price} <span>€</span></h3>
            </div>
            <div className='admin-buttons'>
            <button className='edit-button' onClick={() => handleEditApartment(apartment)}>
        <FontAwesomeIcon icon={faPen} /> {/* Pen icon for edit */}
      </button>
      <button className='delete-button' onClick={() => handleDelete(apartment._id)}>
        <FontAwesomeIcon icon={faTrash} /> {/* Trash icon for delete */}
      </button>
  
    </div>
            {/* <div className='admin-buttons'>
              <button className='delete-button' onClick={() => handleDelete(apartment._id)}> X </button>
              <button className='edit-button' onClick={() => handleEditApartment(apartment)}> Edit </button>
            </div> */}
          </div>
        </div>
      ))}

      {editingApartment && (
        <form className='admin-edit-apartment' onSubmit={handleSubmit}>
          <div className='admin-edit-name-price'>
            <label>
              Name
              <input
                type="text"
                placeholder="Apartment Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Price
              <input
                type="number"
                placeholder="Apartment Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          </div>

          <div className='admin-edit-description'>
            <label>
              Description
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>

          <div className='admin-edit-image'>
            <div className='images-div'>
              <label>Main image</label>
              <input
                type="text"
                placeholder="Image URL"
                value={images.image}
                onChange={(e) => setImages(prev => ({ ...prev, image: e.target.value }))}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'image')}
              />
              {imagePreviews.imagePreview && (
                <div className="image-preview">
                  <img src={imagePreviews.imagePreview} alt="Main Image Preview" />
                </div>
              )}
            </div>

            {['image1', 'image2', 'image3', 'image4', 'image5', 'image6'].map((img, idx) => (
              <div className='images-div' key={idx}>
                <label>Image {idx + 1}</label>
                <input
                  type="text"
                  placeholder={`Image URL ${idx + 1}`}
                  value={images[img]}
                  onChange={(e) => setImages(prev => ({ ...prev, [img]: e.target.value }))}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, img)}
                />
                {imagePreviews[`${img}Preview`] && (
                  <div className="image-preview">
                    <img src={imagePreviews[`${img}Preview`]} alt={`Image ${idx + 1} Preview`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <label>
            Latitude
            <input
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </label>

          <label>
            Longitude
            <input
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </label>

          {showMap && <Map latitude={latitude} longitude={longitude} />}

          <button className='edit-button' type="submit">Save</button>
          <button className='delete-button' type="button" onClick={() => setEditingApartment(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ApartmentList;
