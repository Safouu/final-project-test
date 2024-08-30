import { Routes, Route, NavLink } from 'react-router-dom';
import AdminCalendar from './AdminCalendar';
import ListGuests from './ListGuests';
import AddGuest from './AddGuest';
import ListObjects from './ListObjects';
import AddObject from './AddObject';
import Messages from './Messages';

const Admin = () => {
  return (
    <div className="home">
      <div className="admin-sidebar">
      
        <NavLink to="objects">Apartments</NavLink>
        <NavLink to="add-object">Apartment +</NavLink>
        <NavLink to="add-guest">Guest +</NavLink>
        <NavLink to="calendar">Calendar</NavLink>
        <NavLink to="guests">Guests</NavLink>
        <NavLink to="messages">Messages</NavLink>
        
      </div>

      <div className="admin-content">
        <Routes>
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="guests" element={<ListGuests />} />
          {/* <Route index element={<ListObjects />} /> */}
          <Route path="/" element={<ListObjects />} />
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


