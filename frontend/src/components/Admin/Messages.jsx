import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3232/contacts'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handelDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3232/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedMessages = messages.filter((message) => message._id !== id);
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }

  const handelDeleteAll = async () => {
    try {
      const response = await fetch('http://localhost:3232/contacts', {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMessages([]);
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  }

  return (
    <div className="contact-message-container">
    
    <div className="reservations-table">
     
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Message</th>
            <th>
              <button  className="delete-all-button" onClick={() => handelDeleteAll(  ) }  >
                delete all
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id}>
              <td>
              <a href={`mailto:${message.email}`}>
                {message.email}
                </a>
                </td>

              <td>{message.name}</td>
              <td>{message.message}</td>

              <td>
              <button className='delete-button' onClick={() => handelDelete(message._id)}>
                    <FontAwesomeIcon icon={faTrash} /> 
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  );
};

export default Messages;
