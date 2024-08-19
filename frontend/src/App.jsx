import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Layout from './components/Layout'
import Contact from './components/Contact'
import ObjectDetail from './components/ObjectDetail';
import Register from './components/Register';
import Booking from './components/Booking';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<Contact />} />
          <Route path="booking" element={<Booking />} />
          <Route path="object/:id" element={<ObjectDetail />} /> 
        </Route>

      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
