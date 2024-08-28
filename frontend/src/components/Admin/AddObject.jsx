import { useState } from 'react';

const AddObject = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setImage(value);
    setImagePreview(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
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
        body: JSON.stringify({ name, price, description, image }),
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
    setImagePreview('');
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Add Object</h2>
        <input
          type="text"
          placeholder="Object Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Price $"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={handleInputChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddObject;
