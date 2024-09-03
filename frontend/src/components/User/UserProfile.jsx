import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { isLoggedIn, userId } = useAuth(); 
  const [user, setUser] = useState(null);
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
        const response = await fetch(`http://localhost:3232/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
   
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
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
      <h1>User Profile</h1>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>City:</strong> {user.city}</p>
      <p><strong>Country:</strong> {user.country}</p>

    </div>
  );
};

export default UserProfile;
