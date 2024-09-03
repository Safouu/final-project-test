import { NavLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, isAdmin, isUser, userId, logout } = useAuth();

  console.log('Header Render - isLoggedIn:', isLoggedIn, 'isAdmin:', isAdmin, 'isUser:', isUser, 'userId:', userId);

  return (
    <header className="header">
       <div className="logo">
        <a href="/">
          <img src="./public/images/Dream .png" alt="Logo" className="logo-image" />
        </a>
      </div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {isLoggedIn ? (
          <>
            {isAdmin && <NavLink to="/admin">Admin</NavLink>}
            {isUser && <NavLink to="/userProfile">User Profile</NavLink>}
            {userId && <p>User ID: {userId}</p>}
            <button onClick={logout} className="logout">{`=>`}</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
