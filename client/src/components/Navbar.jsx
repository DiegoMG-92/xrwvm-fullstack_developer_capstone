import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
          <a href="/login" className="nav-item nav-link">Login</a>
          <a href="/register" className="nav-item nav-link">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;