import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { isLoggedIn, userId } = useAuth();

  const [user, setUser] = useState();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    <p>
      My Reservations
    </p>


    <div className='user-profile-reservations' >
      <ul>
        {reservations.length > 0 ? (
          reservations.map(reservation => (
            <li className='reservation' key={reservation._id}>
              {reservation.apartment ? (
                <>
                  <img src={reservation.apartment.image} alt={reservation.apartment.name} style={{height:"220px"}} />
                  <p><strong>Property:</strong> {reservation.apartment.name}</p>
                  <p><strong>Check-in Date:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
                  <p><strong>Check-out Date:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
                  <p><strong>Advance Payment:</strong> {reservation.advancePayment}</p>
                  <p><strong>Total Price:</strong> {reservation.totalPrice}</p>

                  <button className="delete-button" onClick={() => handleDelete(reservation._id)}>X</button>
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

    </div>
  );
};

export default UserProfile;
