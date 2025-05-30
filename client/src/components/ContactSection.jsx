import React from 'react';
import PageHeader from '../components/PageHeader';

const ContactSection = () => {
  return (
    <>
    <PageHeader title="Contact Us"/>
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12">
            <div className="row gy-4">
              <div className="col-md-4">
                <div className="bg-light d-flex flex-column justify-content-center p-4">
                  <h5 className="text-uppercase">// Booking //</h5>
                  <p className="m-0">
                    <i className="fa fa-envelope-open text-primary me-2"></i>
                    book@equinox.com
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-light d-flex flex-column justify-content-center p-4">
                  <h5 className="text-uppercase">// General //</h5>
                  <p className="m-0">
                    <i className="fa fa-envelope-open text-primary me-2"></i>
                    info@equinox.com
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-light d-flex flex-column justify-content-center p-4">
                  <h5 className="text-uppercase">// Technical //</h5>
                  <p className="m-0">
                    <i className="fa fa-envelope-open text-primary me-2"></i>
                    tech@equinox.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
            <iframe
              className="position-relative rounded w-100 h-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
              frameBorder="0"
              style={{ minHeight: '350px', border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              title="Google Map"
            ></iframe>
          </div>

          <div className="col-md-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="name" placeholder="Your Name" />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="email" className="form-control" id="email" placeholder="Your Email" />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="subject" placeholder="Subject" />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: '100px' }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactSection;
