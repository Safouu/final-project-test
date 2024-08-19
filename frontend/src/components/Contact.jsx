import { useState } from 'react';

const Contact = () => {
 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
  
      setName('');
      setEmail('');
      setMessage('');
    };
  
    return (
      <div className="contact-container">
        <div className="company-details">
    
          <p> Worlda Wide Vecation GmbH</p>
          <p> 1234 Street Name, Berlin, CGermany</p>
          <p> (123) 456-7890</p>
          <p><a href="https://www.wwv.com" target="_blank" rel="noopener noreferrer">www.wwv.com</a></p>
        
  
      
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
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
      </div>
    );
  }
  
export default Contact;
