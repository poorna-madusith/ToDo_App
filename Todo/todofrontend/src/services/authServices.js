import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const register = (user) => axios.post(`${API_URL}/register`, user);
export const login = (user) => axios.post(`${API_URL}/login`, user);
export const forgotPassword = (data) => axios.post(`${API_URL}/forgot-password`, data);
export const resetPassword = (data) => axios.post(`${API_URL}/reset-password`, data);
export const updateProfile = (data) => axios.put(`${API_URL}/update-profile`,data);
export const updateUserProfile = (data, token) => {
  if (!token) {
    return Promise.reject(new Error("No authentication token found. Please log in again."));
  }
  return axios.put(`${API_URL}/update-profile`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};