import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          {/* Address */}
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-4">Headquarters</h4>
            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
            <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@equinox.com</p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-youtube"></i></a>
              <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Hours */}
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-4">Opening Hours</h4>
            <h6 className="text-light">Monday - Friday:</h6>
            <p className="mb-4">08.00 AM - 04.00 PM</p>
            <h6 className="text-light">Saturday - Sunday:</h6>
            <p className="mb-0">08.00 AM - 12.00 PM</p>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <a className="border-bottom" href="#">Equinox Automotive</a>, All Right Reserved.
              <br />
              Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
              <br />
              Distributed By: <a className="border-bottom" href="https://themewagon.com" target="_blank" rel="noreferrer">ThemeWagon</a>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <a href="#">Home</a>
                <a href="#">Cookies</a>
                <a href="#">FQAs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;