import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        React JWT Auth
      </Link>
      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button className="btn btn-danger">logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;