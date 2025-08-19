import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Home from './pages/Home'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';



function App() {

  return (
    <div className='mx-4 md:mx-[10%]'>
      <ToastContainer />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
