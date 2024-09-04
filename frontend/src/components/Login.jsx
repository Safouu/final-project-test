import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3232/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login Response:', data);

      if (response.ok) {
        login({
          isAdmin: data.isAdmin,
          isUser: data.isUser,
          userId: data.userId,
          firstName: data.firstName,
        });

     
        if (data.isAdmin) {
          navigate('/admin');
        } else if (data.isUser) {
          navigate('/userProfile');
        } else {
          navigate('/');
        }
      } else {
        setMessage(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }

    
    setEmail('');
    setPassword('');
  };

  return (
    
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group"></div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
        <p>No account? <NavLink to="/register">Register</NavLink></p>
      </form>
    </div>
  );
};

export default Login;
