import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext();

const JWT_TOKEN = 'reactjwttoken';

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({loading: true, token: null});

  const setAuthToken = (token) => {
    setAuth({token});
  }

  useEffect(() => {
    const savedToken = window.localStorage.getItem(JWT_TOKEN);
    setAuth({loading: false, token: savedToken})
  }, []);

  useEffect(() => {
    window.localStorage.setItem(JWT_TOKEN, auth.token);
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{auth, setAuthToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider };

export default AuthContext;