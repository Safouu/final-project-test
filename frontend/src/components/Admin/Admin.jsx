import { Routes, Route, Link } from 'react-router-dom';
import AdminCalendar from './AdminCalendar';
import ListGuests from './ListGuests';
import AddGuest from './AddGuest';
import ListObjects from './ListObjects';
import AddObject from './AddObject';
import Messages from './Messages';

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="calendar">Admin-Calendar</Link></li>
          <li><Link to="add-object">Add Apartment</Link></li>
          <li><Link to="add-guest">Add Guest</Link></li>
          <li><Link to="objects">All Apartments</Link></li>
          <li><Link to="guests">All Guests</Link></li>
          <li><Link to="messages">Messages</Link></li> 
        </ul>
      </div>
      <div className="admin-content">
        <Routes>
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="guests" element={<ListGuests />} />
          <Route path="objects" element={<ListObjects />} />
          <Route path="add-object" element={<AddObject />} />
          <Route path="add-guest" element={<AddGuest />} />
          <Route path="messages" element={<Messages />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
