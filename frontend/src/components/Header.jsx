import { NavLink } from "react-router-dom";

const Header = ({ isLoggedIn, isAdmin }) => {
  return (
    <header className="header">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/contact" className="nav-link">Contact</NavLink>
      {isLoggedIn ? (
        <>
          {isAdmin && <NavLink to="/admin" className="nav-link">Admin</NavLink>}
          <NavLink to="/logout" className="nav-link">Logout</NavLink>
        </>
      ) : (
        <NavLink to="/login" className="nav-link">Login</NavLink>
      )}
    </header>
  );
};

export default Header;
