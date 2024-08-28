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


// .object {
//   border-radius: 8px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//   overflow: hidden;
//   width: 400px;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   cursor: pointer;
//   border: solid 2px rgb(199, 199, 199);
// }

// .object:hover {
//   transform: translateY(-5px);
//   box-shadow: 0 3px 10px 1px #00000083;
//   border: solid 2px rgb(255, 255, 255);
// }