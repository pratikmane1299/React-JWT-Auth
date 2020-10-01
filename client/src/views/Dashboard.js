import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/auth';

import { fetchLoggedInUserProfile } from '../services/API';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserDetails() {
      const response = await fetchLoggedInUserProfile(auth.token);
      setUser(response.data)
      setLoading(false);
    }
    getUserDetails();
  }, []);

  if (loading) {
    return <div className="text-center"><p>Loading...</p></div>
  }

  return (
    <div className="jumbotron">
      <h1 className="display-3">Welcome {`${user.firstName} ${user.lastName}`}</h1>
      <hr className="my-4" />
      <p className="lead">{user.email}</p>
    </div>
  )
}

export default Dashboard;