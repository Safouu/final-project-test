import { useEffect, useState } from 'react';

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

  return (
    <div>
    <h1>Contact Messages</h1>
    <div className='object-message'>
     
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id}>
              <td>{message.email}</td>
              <td>{message.name}</td>
              <td>{message.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Messages;
