import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust this base URL according to your backend setup
});

export const createEmployee = async (employee) => {
  try {
      const response = await API.post('/employees', employee);
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};

export const getEmployees = async () => {
  try {
    const response = await API.get('/employees');
    console.log('API Response:', response.data); // Log the response data to inspect it
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message; // Ensure error message is clear
  }
};

export const updateEmployee = async (id, employee) => {
  try {
      const response = await API.put(`/employees/${id}`, employee);
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};

export const deleteEmployee = async (id) => {
  try {
      const response = await API.delete(`/employees/${id}`);
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};
    

     // Add the following functions to api.js

// Function to create an order
export const createOrder = async (order) => {
  try {
    const response = await API.post('/orders', order);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get all orders
export const getOrders = async () => {
  try {
    const response = await API.get('/orders');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to update an order by ID
export const updateOrder = async (id, order) => {
  try {
    const response = await API.put(`/orders/${id}`, order);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to delete an order by ID
export const deleteOrder = async (id) => {
  try {
    const response = await API.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const createCustomer = async (customer) => {
  try {
      const response = await API.post('/customers', customer);
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};

export const getCustomers = async () => {
  try {
      const response = await API.get('/customers');
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};

export const updateCustomer = async (id, customer) => {
  try {
      const response = await API.put(`/customers/${id}`, customer);
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};

export const deleteCustomer = async (id) => {
  try {
      const response = await API.delete(`/customers/${id}`);
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};
const API_URL = 'http://localhost:3000/api/dailyoutputs';

export const getDailyOutputs = () => axios.get(API_URL);
export const createDailyOutput = (data) => axios.post(API_URL, data);
export const updateDailyOutput = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteDailyOutput = (id) => axios.delete(`${API_URL}/${id}`);
      export default API;
