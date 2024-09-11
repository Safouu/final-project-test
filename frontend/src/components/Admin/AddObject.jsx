import { useState } from 'react';
import Map from './Map';

const AddObject = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState([{ startDate: '', endDate: '', price: '' }]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [image6, setImage6] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [image1Preview, setImage1Preview] = useState('');
  const [image2Preview, setImage2Preview] = useState('');
  const [image3Preview, setImage3Preview] = useState('');
  const [image4Preview, setImage4Preview] = useState('');
  const [image5Preview, setImage5Preview] = useState('');
  const [image6Preview, setImage6Preview] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  // const [placeId, setPlaceId] = useState('');
  const [showMap, setShowMap] = useState(false);


  const handlePriceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPrices = [...price];
    updatedPrices[index] = { ...updatedPrices[index], [name]: value };
    setPrice(updatedPrices);
  };

  const handleAddPriceRange = () => {
    setPrice([...price, { startDate: '', endDate: '', price: '' }]);
  };

  const handleRemovePriceRange = (index) => {
    const updatedPrices = price.filter((_, i) => i !== index);
    setPrice(updatedPrices);
  };



  const handleInputChange = (e, setImageFunction, setImagePreviewFunction) => {
    const value = e.target.value;
    setImageFunction(value);
    setImagePreviewFunction(value);
  };

  const handleFileChange = (e, setImageFunction, setImagePreviewFunction) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFunction(reader.result);
        setImagePreviewFunction(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3232/objects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, description, image, image1, image2, image3, image4, image5, image6, latitude, longitude}),
      });

      if (response.ok) {
        console.log('Object added successfully');
      } else {
        console.error('Failed to add object');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setName('');
    setPrice([{ startDate: '', endDate: '', price: '' }]);
    setDescription('');
    setImage('');
    setImage1('');
    setImage2('');
    setImage3('');
    setImage4('');
    setImage5('');
    setImage6('');
    setImagePreview('');
    setImage1Preview('');
    setImage2Preview('');
    setImage3Preview('');
    setImage4Preview('');
    setImage5Preview('');
    setImage6Preview('');
 
    setLatitude('');
    setLongitude('');
  };




  return (
    <div>
      <form className='add-apartment' onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Object Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* <label>Price</label>
        <input
          type="text"
          placeholder="Price $"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        /> */}
        <label>Description</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />


{price.map((priceRange, index) => (
          <div key={index}>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={priceRange.startDate}
              onChange={(e) => handlePriceChange(index, e)}
              required
            />
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={priceRange.endDate}
              onChange={(e) => handlePriceChange(index, e)}
              required
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={priceRange.price}
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
          onChange={(e) => handleInputChange(e, setImage, setImagePreview)}
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
        
        <label>Image 1</label>
        <input
          type="text"
          placeholder="Image URL 1"
          value={image1}
          onChange={(e) => handleInputChange(e, setImage1, setImage1Preview)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImage1, setImage1Preview)}
        />
        {image1Preview && (
          <div className="image-preview">
            <img
              src={image1Preview}
              alt="Preview"
              style={{ maxWidth: '75%', borderRadius: '8px' }}
            />
          </div>
        )}

        <label>Image 2</label>
        <input
          type="text"
          placeholder="Image URL 2"
          value={image2}
          onChange={(e) => handleInputChange(e, setImage2, setImage2Preview)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImage2, setImage2Preview)}
        />
        {image2Preview && (
          <div className="image-preview">
            <img
              src={image2Preview}
              alt="Preview"
              style={{ maxWidth: '75%', borderRadius: '8px' }}
            />
          </div>
        )}
        
        <label>Image 3</label>
        <input
          type="text"
          placeholder="Image URL 3"
          value={image3}
          onChange={(e) => handleInputChange(e, setImage3, setImage3Preview)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImage3, setImage3Preview)}
        />
        {image3Preview && (
          <div className="image-preview">
            <img
              src={image3Preview}
              alt="Preview"
              style={{ maxWidth: '75%', borderRadius: '8px' }}
            />
          </div>

        )}

<label>Image 4</label>
        <input
          type="text"
          placeholder="Image URL 4"
          value={image4}
          onChange={(e) => handleInputChange(e, setImage4, setImage4Preview)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImage4, setImage4Preview)}
        />
        {image3Preview && (
          <div className="image-preview">
            <img
              src={image4Preview}
              alt="Preview"
              style={{ maxWidth: '75%', borderRadius: '8px' }}
            />
          </div>

        )}

<label>Image 5</label>
        <input
          type="text"
          placeholder="Image URL 5"
          value={image5}
          onChange={(e) => handleInputChange(e, setImage5, setImage5Preview)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImage5, setImage5Preview)}
        />
        {image5Preview && (
          <div className="image-preview">
            <img
              src={image5Preview}
              alt="Preview"
              style={{ maxWidth: '75%', borderRadius: '8px' }}
            />
          </div>

        )}

<label>Image 6</label>
        <input
          type="text"
          placeholder="Image URL 6"
          onChange={(e) => handleFileChange(e, setImage6, setImage6Preview)}
        />
        {image6Preview && (
          <div className="image-preview">
            <img
              src={image6Preview}
              alt="Preview"
              style={{ maxWidth: '75%', borderRadius: '8px' }}
            />
          </div>

        )}

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
       

        <button type="submit">Add</button>

        
      </form>
    </div>
  );
};

export default AddObject;