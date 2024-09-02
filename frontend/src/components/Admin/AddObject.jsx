import { useState } from 'react';

const AddObject = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [image1Preview, setImage1Preview] = useState('');
  const [image2Preview, setImage2Preview] = useState('');
  const [image3Preview, setImage3Preview] = useState('');

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
        body: JSON.stringify({ name, price, description, image, image1, image2, image3 }),
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
    setPrice('');
    setDescription('');
    setImage('');
    setImage1('');
    setImage2('');
    setImage3('');
    setImagePreview('');
    setImage1Preview('');
    setImage2Preview('');
    setImage3Preview('');
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
        <label>Price</label>
        <input
          type="text"
          placeholder="Price $"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddObject;
