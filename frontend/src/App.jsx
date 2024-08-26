import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Contact from "./components/Contact";
import ObjectDetail from "./components/ObjectDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Admin from "./components/Admin/Admin";
import Booking from "./components/Booking";
import Logout from './components/LogOut'; 

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus) {
      setIsLoggedIn(true);
      setIsAdmin(adminStatus === 'true'); 
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path="logout" element={<Logout setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} /> 
          <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<Contact />} />
          <Route path="booking" element={<Booking />} />
          <Route path="object/:id" element={<ObjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
