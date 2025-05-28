import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

const Register = () => {
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          first_name,
          last_name,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
         
        setMessage('Registration successful!');
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <>
      <PageHeader title="Register" />
      <div className="container-fluid bg-secondary booking my-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                <form onSubmit={handleRegister}>
                  <div className="row g-3 justify-content-center">
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Username"
                        style={{ height: '55px' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="First Name"
                        style={{ height: '55px' }}
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Last Name"
                        style={{ height: '55px' }}
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control border-0"
                        placeholder="Email"
                        style={{ height: '55px' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control border-0"
                        placeholder="Password"
                        style={{ height: '55px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <button className="btn btn-secondary w-100 py-3" type="submit">
                        Register
                      </button>
                    </div>
                    {message && (
                      <div className="col-12">
                        <p className="text-white">{message}</p>
                      </div>
                    )}
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