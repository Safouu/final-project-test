import { Link } from 'react-router-dom';

const Admin = () => {

      return (
        <div className="toolbar">
          <h2>Admin</h2>
          <div className="toolbar-actions">
            <Link to="/add-guest" className="toolbar-button">Add New Guest</Link>
            <Link to="addObject" className="toolbar-button">Add New Object</Link>
          </div>
          <div className="toolbar-container">
            <ul>
              <li><Link to="/calendar">Calendar</Link></li>
              <li><Link to="/guests">Guests</Link></li>
              <li><Link to="/objects">Objects</Link></li>
            </ul>
          </div>
         
        </div>
      );
}

export default Admin;
