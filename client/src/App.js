import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import AuthContext from './contexts/auth';

import Header from './components/Header';
import Signup from './views/Signup';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <Router>
      <div className="App">
        {
          auth.token && <Header />
        }
        <main className="container pt-2">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Dashboard} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
