import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ empName: '', mobile: '', dailyWages: '' });

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get('/api/employees');
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/employees', form);
    setForm({ empName: '', mobile: '', dailyWages: '' });
    const res = await axios.get('/api/employees');
    setEmployees(res.data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <form onSubmit={handleSubmit} className="mb-6">
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
          <label className="block text-gray-700">Daily Wages</label>
          <input 
            type="text" 
            name="dailyWages" 
            value={form.dailyWages} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Employee</button>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Emp #</th>
            <th className="px-4 py-2">Emp Name</th>
            <th className="px-4 py-2">Mobile #</th>
            <th className="px-4 py-2">Daily Wages</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.empId}>
              <td className="border px-4 py-2">{emp.empId}</td>
              <td className="border px-4 py-2">{emp.empName}</td>
              <td className="border px-4 py-2">{emp.mobile}</td>
              <td className="border px-4 py-2">{emp.dailyWages}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
    