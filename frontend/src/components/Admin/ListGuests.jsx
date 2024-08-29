import { useState, useEffect } from "react";

const GuestList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:3232/reservation");
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="reservations-table">
      <h2>Guest List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>People</th>
            <th>Children</th>
            <th>Pets</th>
            <th>Price per Day</th>
            <th>Total Price</th>
            <th>Advance Payment</th>
            <th>Apartment</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.firstName}</td>
              <td>{reservation.lastName}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phone}</td>
              <td>{formatDate(reservation.checkin)}</td>
              <td>{formatDate(reservation.checkout)}</td>
              <td>{reservation.people}</td>
              <td>{reservation.children}</td>
              <td>{reservation.pets}</td>
              <td>${reservation.pricePerDay}</td>
              <td>${reservation.totalPrice}</td>
              <td>${reservation.advancePayment}</td>
              <td>{reservation.selectedObject?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
