import React from 'react';

export default function Signup() {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Create New Account</h1>
      <div className="card w-50 mx-auto mt-4">
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    name="firstName"
                    type="string"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input name="lastName"
                    type="string"
                    className="form-control"
                   />
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
                    className="form-control"
                   />
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
                    className="form-control"
                  />
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
                    className="form-control"
                  />
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