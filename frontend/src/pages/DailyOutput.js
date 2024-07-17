import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailyOutput = () => {
  const [dailyOutputs, setDailyOutputs] = useState([]);
  const [form, setForm] = useState({ 
    date: '', 
    empId: '', 
    empName: '', 
    orderId: '', 
    lineItem: '', 
    customerName: '', 
    status: '', 
    value: '' 
  });

  useEffect(() => {
    const fetchDailyOutputs = async () => {
      const res = await axios.get('/api/dailyoutputs');
      setDailyOutputs(res.data);
    };
    fetchDailyOutputs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/dailyoutputs', form);
    setForm({ 
      date: '', 
      empId: '', 
      empName: '', 
      orderId: '', 
      lineItem: '', 
      customerName: '', 
      status: '', 
      value: '' 
    });
    const res = await axios.get('/api/dailyoutputs');
    setDailyOutputs(res.data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Daily Output</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Employee ID</label>
          <input 
            type="text" 
            name="empId" 
            value={form.empId} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Employee Name</label>
          <input 
            type="text" 
            name="empName" 
            value={form.empName} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Order ID</label>
          <input 
            type="text" 
            name="orderId" 
            value={form.orderId} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Line Item</label>
          <input 
            type="text" 
            name="lineItem" 
            value={form.lineItem} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
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
          <label className="block text-gray-700">Status</label>
          <input 
            type="text" 
            name="status" 
            value={form.status} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Value</label>
          <input 
            type="text" 
            name="value" 
            value={form.value} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Daily Output</button>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Employee ID</th>
            <th className="px-4 py-2">Employee Name</th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Line Item</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {dailyOutputs.map((output) => (
            <tr key={output.id}>
              <td className="border px-4 py-2">{output.date}</td>
              <td className="border px-4 py-2">{output.empId}</td>
              <td className="border px-4 py-2">{output.empName}</td>
              <td className="border px-4 py-2">{output.orderId}</td>
              <td className="border px-4 py-2">{output.lineItem}</td>
              <td className="border px-4 py-2">{output.customerName}</td>
              <td className="border px-4 py-2">{output.status}</td>
              <td className="border px-4 py-2">{output.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyOutput;
