import { NavLink } from "react-router-dom";

const Header = ({ isLoggedIn, isAdmin }) => {
  return (
    <header className="header">
      
        <div className='logo'>
            <NavLink to="/">LOGO</NavLink>
        </div>

        <nav>

        <NavLink to="/" >Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
           {isLoggedIn ? (
        <>
           {isAdmin && <NavLink to="/admin">Admin</NavLink>}
           {!isAdmin && <NavLink to="/userProfil">Profil</NavLink>}
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
