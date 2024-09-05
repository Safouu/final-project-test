import { useState } from 'react';

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

    <div className="home">

      <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        
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
        <button type="submit">Send Message</button>
      </form>

      </div>
      <div className="company-details">
        <p>World Wide Vecation GmbH 123</p>
        <p>Berliner Strasse 2b, Berlin, Germany</p>
        <p>(+49) 1456-7890</p>
        <p>
          <a href="https://dream-voacation.com" target="_blank" rel="noopener noreferrer">
            www.wwv.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
