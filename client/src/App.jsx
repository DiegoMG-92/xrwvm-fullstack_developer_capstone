import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import ServiceSection from './components/ServiceSection';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dealers from './pages/Dealers'; // ✅ Make sure this path is correct

function App() {
  const [user, setUser] = useState(null); // ✅ Declare user state

  return (
    <>
      <Navbar user={user} setUser={setUser} /> {/* Optional: if navbar depends on user */}

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
        <Route path="/login" element={<Login setUser={setUser} />} /> {/* Let login update user */}
        <Route path="/register" element={<Register />} />
        <Route path="/dealers" element={<Dealers user={user} />} /> {/* Fixed */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;