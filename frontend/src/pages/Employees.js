import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    empName: '',
    mobile: '',
    dailyWages: ''
  });
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!form.empName) {
      newErrors.empName = 'Employee Name is required';
      isValid = false;
    }

    if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = 'Mobile Number must be a 10-digit number';
      isValid = false;
    }

    if (!form.dailyWages || isNaN(form.dailyWages)) {
      newErrors.dailyWages = 'Daily Wages must be a number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editMode) {
        await updateEmployee(currentId, form);
        setEditMode(false);
        setCurrentId(null);
      } else {
        await createEmployee(form);
      }
      setForm({
        empName: '',
        mobile: '',
        dailyWages: ''
      });
      const res = await getEmployees();
      setEmployees(res);
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} employee:`, error);
    }
  };

  const handleEdit = (employee) => {
    setEditMode(true);
    setCurrentId(employee._id);
    setForm({
      empName: employee.empName,
      mobile: employee.mobile,
      dailyWages: employee.dailyWages
    });
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
          {errors.empName && <p className="text-red-500 text-sm">{errors.empName}</p>}
        </div>
        <div className="mb-4">
  <label className="block text-gray-700">Mobile Number</label>
  <input 
    type="tel" 
    name="mobile" 
    value={form.mobile} 
    onChange={handleChange} 
    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
    pattern="[0-9]{10}" 
    required 
    title="Please enter a 10-digit mobile number"
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700">Daily Wages</label>
  <input 
    type="number" 
    name="dailyWages" 
    value={form.dailyWages} 
    onChange={handleChange} 
    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
    required 
    title="Please enter a valid number for daily wages"
  />
          {errors.dailyWages && <p className="text-red-500 text-sm">{errors.dailyWages}</p>}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          {editMode ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Emp #</th>
            <th className="px-4 py-2">Emp Name</th>
            <th className="px-4 py-2">Mobile #</th>
            <th className="px-4 py-2">Daily Wages</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td className="border px-4 py-2">{emp._id}</td>
              <td className="border px-4 py-2">{emp.empName}</td>
              <td className="border px-4 py-2">{emp.mobile}</td>
              <td className="border px-4 py-2">{emp.dailyWages}</td>
              <td className="border px-4 py-2">
                <button 
                  onClick={() => handleEdit(emp)} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(emp._id)} 
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
