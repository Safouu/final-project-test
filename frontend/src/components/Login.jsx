import { useState } from 'react'; 
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'user@example.com' ) {
      setMessage('Login successful!');
    } else {
      setMessage('Invalid email');
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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

        <p> no account !!! <NavLink to={"/register"} >Register</NavLink> </p>
      </form>

      

    </div>
  );
};

export default Login