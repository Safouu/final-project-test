import { Routes, Route, Link } from 'react-router-dom';
import AdminCalendar from './AdminCalendar';
import ListGuests from './ListGuests';
import AddGuest from './AddGuest';
import ListObjects from './ListObjects';
import AddObject from './AddObject';

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
        <li><Link to="add-object">AddObject +</Link></li>
        <li><Link to="objects">ListObjects</Link></li>
          <li><Link to="calendar">AdminCalendar</Link></li>
          <li><Link to="guests">ListGuests</Link></li>
          <li><Link to="add-guest">AddGuest</Link></li>
        </ul>
      </div>
      <div className="admin-content">
        <Routes>
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="guests" element={<ListGuests />} />
          <Route path="objects" element={<ListObjects />} />
          <Route path="add-object" element={<AddObject />} />
          <Route path="add-guest" element={<AddGuest />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;

