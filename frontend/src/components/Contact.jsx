import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [thanks, setThanks] = useState("Thank you for your message!");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3232/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmitted(true);
        console.log(name, email, message)
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setName('');
    setEmail('');
    setMessage('');
    setThanks(thanks);
  };

  return (

    <div className='home'>

    <div className='contact'>
      <div className='top'>
        <p>Get in Tocuh</p>
      </div>
    </div>
    

      <div className="apartments apart-details"> 

        <form onSubmit={handleSubmit}>
        
        {submitted && <p className="success-message">Thank you for your message!</p>}
        
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      
      <button className='booking-button' type="submit">Send Message</button>

      </form>
      <div>
      <p>Tel: 123456789</p>
      <p>Email: Your.Dream.Vacation@gmail.com</p>
      </div>

      
      
      <div className='map-container'>
      <h3>Adresse</h3>

      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4855.896252935346!2d13.375129177001421!3d52.51627783650461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sde!2sde!4v1726408527045!5m2!1sde!2sde"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>



      </div>


    </div>
    </div>
  );
};

export default Contact;
