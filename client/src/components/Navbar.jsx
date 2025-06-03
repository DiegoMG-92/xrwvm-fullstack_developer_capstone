import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear persisted login
    setUser(null);                   // Clear app state
    alert('Session Terminated');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow">
      <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <h2 className="m-0 text-primary">
          <i className="fa fa-car me-3"></i>Equinox Automotive
        </h2>
      </Link>
      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link to="/" className="nav-item nav-link active">Home</Link>
          <Link to="/about" className="nav-item nav-link">About</Link>
          <Link to="/contact" className="nav-item nav-link">Contact</Link>
          {!user ? (
            <>
              <Link to="/login" className="nav-item nav-link">Login</Link>
              <Link to="/register" className="nav-item nav-link">Register</Link>
            </>
          ) : (
            <>
              <span className="nav-item nav-link">Hi, {user.first_name}</span>
              <button
                onClick={handleLogout}
                className="nav-item nav-link btn btn-link text-decoration-none"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;