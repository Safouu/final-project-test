import { useState } from 'react'; 
import { NavLink } from 'react-router-dom';

const Register = () => {

const [email, setEmail] = useState('');
const [name, setName] = useState('');
const [password, setPassword] = useState('');

//   const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, name, password);

    // if (email === 'user@example.com' ) {
    //   setMessage('Login successful!');
    // } else {
    //   setMessage('Invalid email');
    // }
  };

  return (
    <div className="container">

      <form className="login-form" onSubmit={handleSubmit}>

        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
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

        <button type="submit">Sign up</button>
        {/* {message && <p className="message">{message}</p>} */}

        <p> already have an account !!! <NavLink to={"/login"} >Login</NavLink> </p>
      </form>

    </div>
  );
};

export default Register