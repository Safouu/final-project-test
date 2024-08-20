import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
            <NavLink to="/login" className="nav-link">Login</NavLink>  
        </header>
    ) 
};
  
  export default Header;