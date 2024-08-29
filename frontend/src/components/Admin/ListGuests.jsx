import { useState, useEffect } from "react";
import AddGuest from "./AddGuest"; 

const GuestList = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isAdding, setIsAdding] = useState(false); 

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

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
    setIsAdding(false); 
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3232/reservation/${id}`, {
        method: "DELETE",
      });
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  }

  const handleAdd = () => {
    setSelectedReservation(null);
    setIsAdding(true); 
  };

  const handleClose = () => {
    setSelectedReservation(null);
    setIsAdding(false);
    fetchReservations(); 
  };

  return (
    <div className="reservations-table">
      <h2>Guest List</h2>
      <button style={{ background: 'green', color: 'white', cursor: 'pointer', padding: '10px', border:"none" }} onClick={handleAdd}>Add New Reservation</button>
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.firstName}</td>
              <td>{reservation.lastName}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.checkin}</td>
              <td>{reservation.checkout}</td>
              <td>{reservation.people}</td>
              <td>{reservation.children}</td>
              <td>{reservation.pets}</td>
              <td>${reservation.pricePerDay}</td>
              <td>${reservation.totalPrice}</td>
              <td>${reservation.advancePayment}</td>
              <td>{reservation.selectedObject?.name}</td>
              <td>
                <button style={{ background: 'green', color: 'white', cursor: 'pointer', padding: '2px', border:"none" }}  onClick={() => handleEdit(reservation)}>Edit</button>
              </td>
              <td>
                <button style={{ background: 'red', color: 'white', cursor: 'pointer', padding: '2px', border:"none" }} onClick={() => handleDelete(reservation._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(selectedReservation || isAdding) && (
        <AddGuest
          reservationToEdit={selectedReservation}
          onClose={handleClose}
        />
      )}


    </div>
  );
};

export default GuestList;
