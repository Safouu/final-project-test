import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      {new Date().getFullYear()} @ Your Dream Vacation
      <div style={styles.icons}>
        <a href="mailto:info@yourdreamvacation.com" style={styles.icon}>
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="https://www.facebook.com/yourdreamvacation" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.instagram.com/yourdreamvacation" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.twitter.com/yourdreamvacation" target="_blank" rel="noopener noreferrer" style={styles.icon}>
        <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </footer>
  );
};
const styles = {
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  icons: {
    marginTop: '10px',
  },
  icon: {
    margin: '0 10px',
    color: '#0a218c',
    fontSize: '24px',
    textDecoration: 'none',
  },
};

export default Footer;