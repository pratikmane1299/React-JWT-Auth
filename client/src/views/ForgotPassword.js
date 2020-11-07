import React, { useState } from 'react';

import { forgotPassword } from '../services/API';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setErrors({ ...errors, email: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setErrors({ ...errors, email: 'Please enter email' });
      return;
    }
    setLoading(true);

    try {
      const response = await forgotPassword(email);

      setLoading(false);

      alert(response.data.message);

      setEmail("");
    } catch (error) {
      setLoading(false);

      if (error.response.status === 404 || error.response.status === 400) {
        setErrors({ ...errors, email: error.response.data.message });
      }
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Forgot Password</h1>
      <div className="card w-50 mx-auto mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="email">email</label>
                  <input
                    name="email"
                    type="string"
                    className={
                      errors.email ? 'is-invalid form-control' : 'form-control'
                    }
                    value={email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="invalid-feedback">{errors.email}</span>
                  )}
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-lg btn-block">
              {!loading ? 'Forgot Password' : 'Please Wait'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
