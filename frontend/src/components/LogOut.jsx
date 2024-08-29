import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn, setIsAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userToken');
    
    setIsLoggedIn(false);
    setIsAdmin(false);
    
    navigate('/');
  }, [navigate, setIsLoggedIn, setIsAdmin]);

  return null;
};

export default Logout;
