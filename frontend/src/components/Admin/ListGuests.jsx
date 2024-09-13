import { useState, useEffect } from "react";
import AddGuest from "./AddGuest";

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const GuestList = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:3232/booking");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setReservations(data);
      console.log("reservation:",data)
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
      const response = await fetch(`http://localhost:3232/booking/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

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

      <button className="addNewGuest" onClick={handleAdd}>+ Reservation</button>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Adult</th>
            <th>Children</th>
            <th>Pet</th>
            <th>Ad.Payment</th>
            <th>Total Price</th>
            <th>Apartment</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.user?.firstName || 'N/A'}</td>
              <td>{reservation.user?.lastName || 'N/A'}</td>
              <td>{reservation.user?.email || 'N/A'}</td>
              <td>{formatDate(reservation.startDate)}</td>
              <td>{formatDate(reservation.endDate)}</td>
              <td>{reservation.people}</td>
              <td>{reservation.children}</td>
              <td>{reservation.pets}</td>
              <td>${reservation.advancePayment || '0.00'}</td>
              <td>${reservation.totalPrice || '0.00'}</td>
              <td>{reservation.apartment?.name || 'N/A'}</td>
              <td>
                <button className="button edit" onClick={() => handleEdit(reservation)}>Edit</button>
              </td>
              <td>
                <button className="button delete" onClick={() => handleDelete(reservation._id)}>X</button>
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
