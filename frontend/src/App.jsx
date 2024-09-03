// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Contact from "./components/Contact";
import ObjectDetail from "./components/ObjectDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Admin from "./components/Admin/Admin";
import Booking from "./components/Booking";

import UserProfile from './components/User/UserProfile';
import { AuthProvider } from './context/AuthContext';
import Logout from './components/LogOut';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} /> 
            <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="userProfile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="register" element={<Register />} />
            <Route path="contact" element={<Contact />} />
            <Route path="booking" element={<Booking />} />
            <Route path="object/:id" element={<ObjectDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


