import axios from 'axios';
// api.js
const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createEmployee = (employee) => API.post('/employees', employee);
export const getEmployees = () => API.get('/employees');
export const updateEmployee = (id, employee) => API.put(`/employees/${id}`, employee);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const createOrder = (order) => API.post('/orders', order);
export const getOrders = () => API.get('/orders');
export const updateOrder = (id, order) => API.put(`/orders/${id}`, order);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

export default API;
