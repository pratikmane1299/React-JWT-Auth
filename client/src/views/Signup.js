import React from 'react';

import { signUp } from '../services/API';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {}
};

export default class Signup extends React.Component {
  state = initialState;

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: ''
      }
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    if (Object.keys(errors).length === 0) {

      try {
        const response = await signUp({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        });

        this.props.history.push('/login');
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              this.setState({
                errors: error.response.data.error.validationErrors
              });
              break;
            case 409:
              this.setState({
                errors: {
                  email: error.response.data.message
                }
              });
              break;
          
            default:
              break;
          }
        }
      }

    } else {
      this.setState({
        errors
      });
    }
  }

  validate() {
    const { firstName, lastName, email, password, confirmPassword } = this.state;

    let errors = {};

    if (firstName.trim() === '') errors.firstName = 'First Name is required';
    if (lastName.trim() === '') errors.lastName = 'Last Name is required';
    if (!/\S+@\S+\.\S+/i.test(email)) errors.email = 'Invalid Email';
    if (email.trim() === '') errors.email = 'Email is required';
    if (password.trim() === '') errors.password = 'Password is required';
    // if (confirmPassword.trim() !== password.trim()) errors.confirmPassword = 'Passwords dont match';
    if (confirmPassword.trim() === '') errors.confirmPassword = 'Confirm Password is required';

    return errors;
  }

  render() {
    const { firstName, lastName, email, password, confirmPassword, errors } = this.state;
    return (
      <div className="d-flex flex-column align-items-center">
        <h1>Create New Account</h1>
        <div className="card w-50 mx-auto mt-4">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      name="firstName"
                      type="string"
                      className={errors.firstName ? 'is-invalid form-control': 'form-control'}
                      value={firstName}
                      onChange={this.handleChange}
                    />
                    {
                      errors.firstName && (
                        <span className="invalid-feedback">{errors.firstName}</span>
                      )
                    }
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input name="lastName"
                      type="string"
                      className={errors.lastName ? 'is-invalid form-control': 'form-control'}
                      value={lastName}
                      onChange={this.handleChange}
                    />
                    {
                      errors.lastName && (
                        <span className="invalid-feedback">{errors.lastName}</span>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      type="string"
                      className={errors.email ? 'is-invalid form-control': 'form-control'}
                      value={email}
                      onChange={this.handleChange}
                    />
                    {
                      errors.email && (
                        <span className="invalid-feedback">{errors.email}</span>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      name="password"
                      type="password"
                      className={errors.password ? 'is-invalid form-control': 'form-control'}
                      value={password}
                      onChange={this.handleChange}
                    />
                    {
                      errors.password && (
                        <span className="invalid-feedback">{errors.password}</span>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className={errors.confirmPassword ? 'is-invalid form-control': 'form-control'}
                      value={confirmPassword}
                      onChange={this.handleChange}
                    />
                    {
                      errors.confirmPassword && (
                        <span className="invalid-feedback">{errors.confirmPassword}</span>
                      )
                    }
                  </div>
                </div>
              </div>
              <button className="btn btn-primary btn-lg btn-block">SignUp</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}