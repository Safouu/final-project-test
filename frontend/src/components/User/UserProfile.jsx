import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { isLoggedIn, userId } = useAuth();

  const [user, setUser] = useState();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  ////////// State for editing
  const [editingReservation, setEditingReservation] = useState(null);
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editAdvancePayment, setEditAdvancePayment] = useState('');
  const [editTotalPrice, setEditTotalPrice] = useState('');

  const fetchUserData = async () => {
    if (!isLoggedIn || !userId) {
      setError('User is not logged in or user ID is not available.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3232/userProfile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile and reservations');
      }

      const data = await response.json();
      setUser(data.user);
      setReservations(data.bookings);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isLoggedIn, userId]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3232/booking/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      fetchUserData();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleEditReservation = (reservation) => {
    setEditingReservation(reservation);
    setEditStartDate(reservation.startDate);
    setEditEndDate(reservation.endDate);
    setEditAdvancePayment(reservation.advancePayment);
    setEditTotalPrice(reservation.totalPrice);
  };

  const handleUpdateReservation = async (e) => {
    e.preventDefault();

    const updatedReservation = {
      startDate: editStartDate,
      endDate: editEndDate,
      advancePayment: editAdvancePayment,
      totalPrice: editTotalPrice,
    };

    try {
      const response = await fetch(`http://localhost:3232/booking/${editingReservation._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReservation),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setReservations(reservations.map((reservation) =>
          reservation._id === updatedData._id ? updatedData : reservation
        ));
        setEditingReservation(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className='home'>
      <div className='user-profile'>
        <div className='top'>
          <p>{user.firstName} {user.lastName}</p>
        </div>
      </div>



      <p>My Reservations</p>

      <div className='user-profile-reservations'>
        <ul>
          {reservations.length > 0 ? (
            reservations.map(reservation => (
              <li className='reservation' key={reservation._id}>
                {reservation.apartment ? (
                  <>
                    <img src={reservation.apartment.image} alt={reservation.apartment.name} style={{ height: "220px" }} />
                    <p><strong>Property:</strong> {reservation.apartment.name}</p>
                    <p><strong>Check-in Date:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
                    <p><strong>Check-out Date:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
                    <p><strong>Advance Payment:</strong> {reservation.advancePayment}</p>
                    <p><strong>Total Price:</strong> {reservation.totalPrice}</p>

                    <button className="delete-button" onClick={() => handleDelete(reservation._id)}>X</button>
                    <button className="edit-button" onClick={() => handleEditReservation(reservation)}>Edit</button>
                  </>
                ) : (
                  <p>No apartment data available for this reservation</p>
                )}
              </li>
            ))
          ) : (
            <p>No reservations</p>
          )}
        </ul>
      </div>

      {editingReservation && (
        <form className='edit-reservation-form' onSubmit={handleUpdateReservation}>
          <h2>Edit Reservation</h2>
          <label>
            Check-in Date
            <input
              type="date"
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            Check-out Date
            <input
              type="date"
              value={editEndDate}
              onChange={(e) => setEditEndDate(e.target.value)}
              required
            />
          </label>
          <label>
            Advance Payment
            <input
              type="number"
              value={editAdvancePayment}
              onChange={(e) => setEditAdvancePayment(e.target.value)}
              required
            />
          </label>
          <label>
            Total Price
            <input
              type="number"
              value={editTotalPrice}
              onChange={(e) => setEditTotalPrice(e.target.value)}
              required
            />
          </label>
          <button className='edit-button' type="submit">Save</button>
          <button className='delete-button' type="button" onClick={() => setEditingReservation(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
