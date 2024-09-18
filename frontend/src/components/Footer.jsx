import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


library.add(faFacebookF, faInstagram, faTwitter, faEnvelope);



const Footer = () => {
  return (
    <footer>
      {new Date().getFullYear()} @ Your Dream Vacation  



    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ color: 'fuchsia', fontSize: '1.2rem'}} icon={['fab', 'instagram']}  />
    </a>

    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ color: 'blue', fontSize: '1.2rem' }} icon={['fab', 'facebook-f']} />
    </a>

    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ color: 'cyan', fontSize: '1.2rem'}} icon={['fab', 'twitter']} />
    </a>

    <a href="mailto:your-dream-vacation@gmail.com">
    <FontAwesomeIcon style={{ color: 'forestgreen', fontSize: '1.2rem'}} icon={['fa', 'envelope']} />
    </a>
 
    </footer>
) 
  };
  
  export default Footer;