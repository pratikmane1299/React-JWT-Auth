import axios from 'axios';

const API_URL = 'http://localhost:1234/api';

export function signUp(input) {
  return axios.post(`${API_URL}/auth/signup`, input);
}

export function login(input) {
  return axios.post(`${API_URL}/auth/login`, input);
}