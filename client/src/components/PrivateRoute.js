import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../contexts/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    return (
      <Route {...rest} render={() => (
        <p>Loading...</p>
      )} />
    )
  }

  return (
    <Route {...rest} render={(props) => (
      auth.token ? <Component {...props} /> : <Redirect to="/login" />
    )
    } />
  )
}

export default PrivateRoute;
