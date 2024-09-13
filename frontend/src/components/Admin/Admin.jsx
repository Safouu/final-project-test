import { Routes, Route, NavLink } from 'react-router-dom';
import AdminCalendar from './AdminCalendar';
import ListGuests from './ListGuests';
import AddGuest from './AddGuest';
import Messages from './Messages';
import ApartmentList from './ApartmentList';
import AddApartment from './AddApartment';

const Admin = () => {
  return (
    <div className='layout'>

      <div className="admin-sidebar">
        <NavLink to="apartment">Apartments</NavLink>
        <NavLink to="add-apartment">Apartment +</NavLink>
        <NavLink to="add-guest">Guest +</NavLink>
        <NavLink to="calendar">Calendar</NavLink>
        <NavLink to="guests">Guests</NavLink>
        <NavLink to="messages">Messages</NavLink>
      </div>

      <div className="admin-content">
        <Routes>
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="guests" element={<ListGuests />} />
          <Route path="/" element={<ApartmentList />} />
          <Route path="apartment" element={<ApartmentList />} />
          <Route path="add-apartment" element={<AddApartment />} />
          <Route path="add-guest" element={<AddGuest />} />
          <Route path="messages" element={<Messages />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default Admin;


