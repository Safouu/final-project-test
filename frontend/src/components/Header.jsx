import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus) {
      setIsLoggedIn(true);
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <header className="header">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/contact" className="nav-link">Contact</NavLink>
      {isLoggedIn ? (
        <>
          {isAdmin && <NavLink to="/admin" className="nav-link">Admin</NavLink>}
          <NavLink to="/" className="nav-link" onClick={handleLogout}>Logout</NavLink>
        </>
      ) : (
        <NavLink to="/login" className="nav-link">Login</NavLink>
      )}
    </header>
  );
};

export default Header;
