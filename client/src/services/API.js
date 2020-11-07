import axios from 'axios';

const API_URL = `http://localhost:${process.env.REACT_APP_API_PORT}/api`;

export function signUp(input) {
  return axios.post(`${API_URL}/auth/signup`, input);
}

export function login(input) {
  return axios.post(`${API_URL}/auth/login`, input);
}

export function fetchLoggedInUserProfile(token) {
  return axios.get(`${API_URL}/dashboard/profile`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export function forgotPassword(email) {
  return axios.post(`${API_URL}/auth/forgot-password`, {email});
}
