import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ListObject = () => {
  const [objects, setObjects] = useState(null);
  const [editingObject, setEditingObject] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3232/objects')
      .then((res) => res.json())
      .then((data) => {
        setObjects(data);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3232/objects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const newObjects = objects.filter((item) => item._id !== id);
        setObjects(newObjects);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingObject((prevObject) => ({ ...prevObject, [name]: value }));
  };

  const handleEditClick = (object) => {
    setEditingObject(object);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingObject((prevObject) => ({
          ...prevObject,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3232/objects/${editingObject._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingObject.name,
          description: editingObject.description,
          price: editingObject.price,
          image: editingObject.image,
        }),
      });

      if (response.ok) {
        const updatedObject = await response.json();

        const newObjects = objects.map((item) =>
          item._id === updatedObject._id ? updatedObject : item
        );
        setObjects(newObjects);

        setEditingObject(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='objects-container'>
      {objects && objects.map((item) => (
        <div key={item._id}>
            <div className='object'>
              <img src={item.image} alt={item.name} />
              {/* <h4>ID: {item._id}</h4> */}
              <div className='object-details'>
              <h1>{item.name}</h1>
              <h3>{(item.description).slice(0,30)}...</h3>
              <p>{item.price} $</p>
        <button
            style={{ background: 'red', color: 'white', cursor: 'pointer', padding: '5px 10px' }}
            onClick={() => handleDelete(item._id)}
          >
            Delete
        </button>
        <button
            style={{ background: 'green', color: 'white', cursor: 'pointer', padding: '5px 10px' }}
            onClick={() => handleEditClick(item)}
          >
            Edit
        </button>
              </div>

            </div>

        </div>
      ))}

      {editingObject && (
        <div className='edit-modal'>
          <form onSubmit={handleEditSubmit}>
            <label>
              Name:
              <input
                type='text'
                name='name'
                value={editingObject.name}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Description:
              <input
                type='text'
                name='description'
                value={editingObject.description}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Price:
              <input
                type='number'
                name='price'
                value={editingObject.price}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Image:
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </label>
            {editingObject.image && (
              <div>
                <img src={editingObject.image} alt="Preview"  />
              </div>
            )}
            <div className='edit-delete-btn'>            
            <button type='submit' >
              Save
            </button>
            <button type='button' onClick={() => setEditingObject(null)}>
              Cancel
            </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListObject;
