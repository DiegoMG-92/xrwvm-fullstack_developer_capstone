import React from 'react';
import PageHeader from '../components/PageHeader';

const Register = () => {
  return (
    <>
    <PageHeader title="Register" />
    <div className="container-fluid bg-secondary booking my-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
              <form>
                <div className="row g-3 justify-content-center">
                  <div className="col-12">
                    <input type="text" className="form-control border-0" placeholder="Username" style={{ height: '55px' }} />
                  </div>
                  <div className="col-12">
                    <input type="text" className="form-control border-0" placeholder="First Name" style={{ height: '55px' }} />
                  </div>
                  <div className="col-12">
                    <input type="text" className="form-control border-0" placeholder="Last Name" style={{ height: '55px' }} />
                  </div>
                  <div className="col-12">
                    <input type="email" className="form-control border-0" placeholder="Email" style={{ height: '55px' }} />
                  </div>
                  <div className="col-12">
                    <input type="password" className="form-control border-0" placeholder="Password" style={{ height: '55px' }} />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-secondary w-100 py-3" type="submit">Register</button>
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

export default Register;