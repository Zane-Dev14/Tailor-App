import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ customerName: '', mobile: '', place: '', remarks: '' });

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await axios.get('/api/customers');
      setCustomers(res.data);
    };
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/customers', form);
    setForm({ customerName: '', mobile: '', place: '', remarks: '' });
    const res = await axios.get('/api/customers');
    setCustomers(res.data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Customer Name</label>
          <input 
            type="text" 
            name="customerName" 
            value={form.customerName} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number</label>
          <input 
            type="text" 
            name="mobile" 
            value={form.mobile} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Place</label>
          <input 
            type="text" 
            name="place" 
            value={form.place} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Remarks</label>
          <input 
            type="text" 
            name="remarks" 
            value={form.remarks} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Customer</button>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Customer #</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Mobile #</th>
            <th className="px-4 py-2">Place</th>
            <th className="px-4 py-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td className="border px-4 py-2">{customer.customerId}</td>
              <td className="border px-4 py-2">{customer.customerName}</td>
              <td className="border px-4 py-2">{customer.mobile}</td>
              <td className="border px-4 py-2">{customer.place}</td>
              <td className="border px-4 py-2">{customer.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
