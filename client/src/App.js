import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Signup from './views/Signup';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container pt-2">
        <Switch>
          <Route exact path="/">
            <h3>Dashboard</h3>
          </Route>
          <Route path="/signup" component={Signup} />
          <Route path="/login">
            <h3>Login</h3>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;