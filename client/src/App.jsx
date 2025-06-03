import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import ServiceSection from './components/ServiceSection';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dealers from './pages/Dealers'; 
import Reviews from './pages/Reviews';

function App() {
  // ✅ Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Keep localStorage in sync when user logs in
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <ServiceSection />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dealers" element={<Dealers user={user} />} />
        <Route path="/reviews/:dealerId" element={<Reviews user={user} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;