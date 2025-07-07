import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';


export const getTasks =  () => axios.get(API_URL);
export const addTask = (task)=> axios.post(API_URL,task);
export const updateTask = (id, updatedTask) => axios.put(`${API_URL}/${id}`, updatedTask);
export const deletetask = (id) => axios.delete(`${API_URL}/${id}`);