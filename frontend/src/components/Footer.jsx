import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


library.add(faFacebookF, faInstagram, faTwitter);



const Footer = () => {
  return (
    <footer>
      {new Date().getFullYear()} @ Your Dream Vacation

      <FontAwesomeIcon style={{color:'fuchsia', fontSize:'1.5rem'}} icon={['fab', 'instagram']} size="1x" />
    
      <FontAwesomeIcon style={{color:'blue', fontSize:'1.5rem'}} icon={['fab', 'facebook-f']}  />

      <FontAwesomeIcon style={{color:'cyan', fontSize:'1.5rem'}} icon={['fab', 'twitter']} size="1x" />

   
    </footer>
) 
  };
  
  export default Footer;