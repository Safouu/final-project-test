import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


library.add(faFacebookF, faInstagram, faTwitter, faEnvelope);



const Footer = () => {
  return (
    <footer>
      {new Date().getFullYear()} @ Your Dream Vacation  

    <div style={{ marginTop: '50px' }}> 
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ color: 'fuchsia', fontSize: '1.2rem', marginLeft:'-180px' }} icon={['fab', 'instagram']} size="1x" />
    </a>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ color: 'blue', fontSize: '1.2rem', marginLeft: '10px' }} icon={['fab', 'facebook-f']} />
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ color: 'cyan', fontSize: '1.2rem', marginLeft: '10px' }} icon={['fab', 'twitter']} size="1x" />
    </a>
    <a href="mailto:your-dream-vacation@gmail.com">
    <FontAwesomeIcon style={{ color: 'red', fontSize: '1.2rem', marginLeft: '10px' }} icon={['fa', 'envelope']} size="1x" />
    </a>
  </div>
    </footer>
) 
  };
  
  export default Footer;