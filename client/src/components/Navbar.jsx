import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear persisted login
    setUser(null);                   // Clear context state
    alert('Session Terminated');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow">
      <a href="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <h2 className="m-0 text-primary">
          <i className="fa fa-car me-3"></i>Equinox Automotive
        </h2>
      </a>
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
              <button
                onClick={handleLogout}
                className="nav-item nav-link btn btn-link text-decoration-none"
              >
                Logout
              </button>
              <span className="nav-item nav-link">{user.username}</span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;