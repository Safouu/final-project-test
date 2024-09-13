import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { isLoggedIn, userId } = useAuth();

  const [user, setUser] = useState();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        console.log(data)
        setUser(data.user);
        setReservations(data.bookings); 

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn, userId]);

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
    <div>
      <h1>{user.firstName} Profile</h1>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>

      <h2>Reservations</h2>
      <ul>
        {reservations.length > 0 ? (
          reservations.map(reservation => (
            <li key={reservation._id}>
              {reservation.apartment ? (
                <>
                  <p><strong>Property:</strong> {reservation.apartment.name}</p>
                  <p><strong>Check-in Date:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
                  <p><strong>Check-out Date:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
                  <p><strong>Total Price:</strong> {reservation.totalPrice}</p>
                  <p><strong>Advance Payment:</strong> {reservation.advancePayment}</p>
                </>
              ) : (
                <p>No apartment data available for this reservation</p>
              )}
            </li>
          ))
        ) : (
          <p>No reservations found</p>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;
