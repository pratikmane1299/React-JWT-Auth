import React from 'react';

import { login } from '../services/API';
import AuthContext from '../contexts/auth';

const initialState = {
  email: '',
  password: '',
  errors: {}
};

export default class Login extends React.Component {
  state = initialState;
  static contextType = AuthContext;

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
        const response = await login({ email: this.state.email, password: this.state.password });
        this.context.setAuthToken(response.data.token);
        this.props.history.push('/');
      } catch(error) {

        if (error.response) {
          switch (error.response.status) {
            case 404:
              this.setState({
                errors: {
                  email: error.response.data.message
                }
              });
              break;
            case 401:
              this.setState({
                errors: {
                  password: error.response.data.message
                }
              })
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
    const { email, password } = this.state;

    let errors = {};

    if (!/\S+@\S+\.\S+/i.test(email)) errors.email = 'Invalid Email';
    if (email.trim() === '') errors.email = 'Email is required';
    if (password.trim() === '') errors.password = 'Password is required';

    return errors;
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="d-flex flex-column align-items-center">
        <h1>Login to your account</h1>
        <div className="card w-50 mx-auto mt-4">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">email</label>
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
              <button className="btn btn-primary btn-lg btn-block">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}