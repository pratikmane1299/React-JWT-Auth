import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../contexts/auth';

const Header = () => {
  const { setAuthToken } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          React JWT Auth
      </Link>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button className="btn btn-danger" onClick={() => {
                setAuthToken(null)
              }}>logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header;