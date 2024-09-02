import { NavLink } from "react-router-dom";

const Header = ({ isLoggedIn, isAdmin }) => {
  return (
    <header className="header">
      
      <div className="logo">
    <a href="/">
      <img src="./public/images/Dream.png" alt="Logo" className="logo-image" />
    </a>
  </div>

        <nav>

        <NavLink to="/" >Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
           {isLoggedIn ? (
        <>
           {isAdmin && <NavLink to="/admin">Admin</NavLink>}
           {!isAdmin && <NavLink to="/userProfile"> Profil</NavLink>}

        <NavLink to="/logout" className="logout">Logout</NavLink>
        </>
        ) : (
        <NavLink to="/login">Login</NavLink>
        )}

         </nav>

    </header>
  );
};

export default Header;
