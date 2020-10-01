import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        <h1>Login to your account</h1>
        <div className="card w-50 mx-auto mt-4">
          <div className="card-body">
            <form>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">email</label>
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
                      type="string"
                      className="form-control"
                    />
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