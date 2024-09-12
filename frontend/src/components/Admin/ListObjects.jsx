import { useState, useEffect } from 'react';
import Map from './Map';


const ListObject = () => {
  const [objects, setObjects] = useState([]);
  const [editingObject, setEditingObject] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prices, setPrices] = useState([{ startDate: '', endDate: '', price: '' }]);
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3232/objects')
      .then((res) => res.json())
      .then((data) => setObjects(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3232/objects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setObjects(objects.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditObject = (object) => {
    setEditingObject(object);
    setName(object.name || '');
    setDescription(object.description || '');
    setPrices(object.prices || [{ startDate: '', endDate: '', price: '' }]);
    setImage(object.image || '');
    setImagePreview(object.image || '');
    setLatitude(object.latitude || '');
    setLongitude(object.longitude || '');
    setShowMap(!!object.latitude && !!object.longitude);
  };

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

  const handleAddPriceRange = () => {
    setPrices([...prices, { startDate: '', endDate: '', price: '' }]);
  };

  const handleRemovePriceRange = (index) => {
    setPrices(prices.filter((_, i) => i !== index));
  };

  const handlePriceChange = (index, e) => {
    const { name, value } = e.target;
    const newPrices = [...prices];
    newPrices[index] = { ...newPrices[index], [name]: value };
    setPrices(newPrices);
  };

  const handleInputChange = (e, setImageState) => {
    const value = e.target;
    setImageState(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedObject = {
      name,
      description,
      prices,
      image,
      latitude,
      longitude,
    };

    try {
      const response = await fetch(`http://localhost:3232/objects/${editingObject._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedObject),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setObjects(objects.map((item) =>
          item._id === updatedData._id ? updatedData : item
        ));
        setEditingObject(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='objects-container'>
      {objects.map((item) => (
        <div key={item._id} className='object'>
          <img src={item.image} alt={item.name} />
          <div className='object-details'>
            <h1>{item.name}</h1>
            <h3>{item.description.slice(0, 30)}...</h3>
            {/* <p>{item.price} $</p> */}
            <button
              style={{ background: 'red', color: 'white', cursor: 'pointer', padding: '5px 10px' }}
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
            <button
              style={{ background: 'green', color: 'white', cursor: 'pointer', padding: '5px 10px' }}
              onClick={() => handleEditObject(item)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}

      {editingObject && (
        <div className='edit-modal'>
          <form className='add-apartment' onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Object Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {prices.map((priceRange, index) => (
              <div key={index}>
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={priceRange.startDate || ''}
                  onChange={(e) => handlePriceChange(index, e)}
                  required
                />
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={priceRange.endDate || ''}
                  onChange={(e) => handlePriceChange(index, e)}
                  required
                />
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={priceRange.price || ''}
                  onChange={(e) => handlePriceChange(index, e)}
                  required
                />
                <button type="button" onClick={() => handleRemovePriceRange(index)}>Remove Price</button>
              </div>
            ))}
            <button type="button" onClick={handleAddPriceRange}>Add Price</button>

            <label>Main image</label>
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => handleInputChange(e, setImage)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setImage, setImagePreview)}
            />
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: '75%', borderRadius: '8px' }}
                />
              </div>
            )}

            {/* Repeat for other images */}
            {['image1', 'image2', 'image3', 'image4', 'image5', 'image6'].map((img, idx) => (
              <div key={idx}>
                <label>Image {idx + 1}</label>
                <input
                  type="text"
                  placeholder={`Image URL ${idx + 1}`}
                  value={editingObject[img] || ''}
                  onChange={(e) => handleInputChange(e, (value) => setEditingObject(prev => ({ ...prev, [img]: value })))}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, (value) => setEditingObject(prev => ({ ...prev, [img]: value })), (value) => setEditingObject(prev => ({ ...prev, [`${img}Preview`]: value })))}
                />
                {editingObject[`${img}Preview`] && (
                  <div className="image-preview">
                    <img
                      src={editingObject[`${img}Preview`]}
                      alt="Preview"
                      style={{ maxWidth: '75%', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </div>
            ))}

            <label>Latitude</label>
            <input
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
            <label>Longitude</label>
            <input
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />

            {showMap && <Map latitude={latitude} longitude={longitude} />}

            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingObject(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListObject;