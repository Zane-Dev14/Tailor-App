import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ empName: '', mobile: '', dailyWages: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getEmployees();
        setEmployees(res);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateEmployee(currentId, form);
        setEditMode(false);
        setCurrentId(null);
      } else {
        await createEmployee(form);
      }
      setForm({ empName: '', mobile: '', dailyWages: '' });
      const res = await getEmployees();
      setEmployees(res);
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} employee:`, error);
    }
  };

  const handleEdit = (employee) => {
    setEditMode(true);
    setCurrentId(employee._id);
    setForm({ empName: employee.empName, mobile: employee.mobile, dailyWages: employee.dailyWages });
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      const res = await getEmployees();
      setEmployees(res);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
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
              <tr key={emp._id}>
                <td className="border px-4 py-2">{emp._id}</td>
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
    