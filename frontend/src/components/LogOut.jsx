import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn, setIsAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage and update states
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userToken');
    
    setIsLoggedIn(false);
    setIsAdmin(false);
    
    // Navigate to the login page
    navigate('/login');
  }, [navigate, setIsLoggedIn, setIsAdmin]);

  return null;
};

export default Logout;
