import { Routes, Route, NavLink } from 'react-router-dom';
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
          <li><NavLink to="objects">All Apartments</NavLink></li>
          <li><NavLink to="add-object">Add Apartment +</NavLink></li>
          <li><NavLink to="add-guest">Add Guest +</NavLink></li>
          <li><NavLink to="calendar">Admin-Calendar</NavLink></li>
          <li><NavLink to="guests">All Guests</NavLink></li>
          <li><NavLink to="messages">Messages</NavLink></li> 
        </ul>
      </div>
      <div className="admin-content">
        <Routes>
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="guests" element={<ListGuests />} />
          {/* <Route index element={<ListObjects />} /> */}
          <Route path="objects" element={<ListObjects />} />
          <Route path="add-object" element={<AddObject />} />
          <Route path="add-guest" element={<AddGuest />} />
          <Route path="messages" element={<Messages />} /> 
        </Routes>

        {/* <ListObjects/> */}
      </div>
    </div>
  );
};

export default Admin;


