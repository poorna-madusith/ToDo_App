import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getTasks = () => axios.get(API_URL, { headers: getAuthHeader() });
export const addTask = (task) => axios.post(API_URL, task, { headers: getAuthHeader() });
export const updateTask = (id, updatedTask) => axios.put(`${API_URL}/${id}`, updatedTask, { headers: getAuthHeader() });
export const deletetask = (id) => axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });