import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const logout = () => {
  localStorage.removeItem('user');
};

export { register, login, getCurrentUser, logout };
