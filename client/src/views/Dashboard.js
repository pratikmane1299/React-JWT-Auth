import React, { useContext } from 'react';
import AuthContext from '../contexts/auth';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth.token);

  return (
    <h1>Dashboard</h1>
  )
}

export default Dashboard;