import { useState } from 'react';

const AddObject = () => {
  
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


  
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

  
      } catch (error) {
        console.error('Error:', error);
      }
  
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
    };
  
    return (
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
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
            onChange={(e) => setImage(e.target.value)}
            required
          />
  
          <button type="submit">Add</button>

  
        </form>
      </div>
    );
  };
  

export default AddObject;
