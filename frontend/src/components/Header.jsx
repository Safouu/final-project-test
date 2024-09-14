import { NavLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, isAdmin, isUser, firstName, logout } = useAuth();

  console.log('Header - isLoggedIn:', isLoggedIn, 'isAdmin:', isAdmin, 'isUser:', isUser, 'firstName:', firstName);

  return (
    <header className="header">

       <nav className="logo">
        <NavLink to="/">
          Y.D.V
        </NavLink>
      </nav>
      
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {isLoggedIn ? (
          <>
            {isAdmin && <NavLink to="/admin">Admin</NavLink>}
            {isUser && <NavLink to="/userProfile">{firstName} </NavLink>}
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
