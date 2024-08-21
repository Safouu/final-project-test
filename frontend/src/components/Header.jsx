import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/contact" className="nav-link">Contact</NavLink>
      {isLoggedIn ? (
        <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
      ) : (
        <NavLink to="/login" className="nav-link">Login</NavLink>
      )}
    </header>
  );
};

export default Header;
