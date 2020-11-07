import React, { useEffect, useState } from "react";

import { resetPassword } from '../services/API';

const ResetPassword = ({ match, history }) => {

  const [resetPasswordToken, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { token } = match.params;
    setToken(token);
  }, [match]);

  const handleNewPasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
    setErrors({ ...errors, newPassword: '' });
  };

  const handleConfirmNewPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmNewPassword(value);
    setErrors({ ...errors, confirmNewPassword: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {

      try {
        const response = await resetPassword({newPassword, confirmNewPassword}, resetPasswordToken);

        alert(response.data.message);

        history.push('/login');

      } catch(error) {
        switch (error.response.status) {
          case 400:
            setErrors(error.response.data.error.validationErrors);
            break;
          case 403:
            alert(error.response.data.message);
          default:
            break;
        }
      }

    } else {
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    let errors = {};

    if (newPassword.trim() === '') errors.newPassword = 'New Password is required';
    if (confirmNewPassword.trim() !== newPassword.trim()) errors.confirmNewPassword = 'Passwords dont match';
    if (confirmNewPassword.trim() === '') errors.confirmNewPassword = 'Confirm New Password is required';

    return errors;
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Reset Password</h1>
      <div className="card w-50 mx-auto mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    name="newPassword"
                    type="password"
                    className={
                      errors.newPassword
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  {errors.newPassword && (
                    <span className="invalid-feedback">{errors.newPassword}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="confirmNewPassword">Confirm New Password</label>
                  <input
                    name="confirmNewPassword"
                    type="password"
                    className={
                      errors.confirmNewPassword
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                  />
                  {errors.confirmNewPassword && (
                    <span className="invalid-feedback">{errors.confirmNewPassword}</span>
                  )}
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-lg btn-block">
              {!loading ? 'Reset Password' : 'Please Wait'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
