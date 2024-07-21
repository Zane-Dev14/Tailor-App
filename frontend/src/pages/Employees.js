import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/api';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({ empName: '', mobile: '', dailyWages: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
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

    const formatName = (name) => {
      return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      setLoading(true);
    
      const formattedName = formatName(form.empName);
    
      try {
        const existingEmployee = employees.find(emp => emp.empName === formattedName);
    
        if (existingEmployee) {
          setErrorMessage('Employee already exists. Please edit the existing employee.');
          setLoading(false);
          alert('Employee already exists. Please edit the existing employee.');
          return;
        }
    
        if (editMode) {
          await updateEmployee(currentId, { ...form, empName: formattedName });
        } else {
          const lastEmployee = employees[employees.length - 1];
          const newEmployeeId = lastEmployee ? lastEmployee.empId + 1 : 1;
          await createEmployee({ ...form, empName: formattedName, empId: newEmployeeId });
        }
    
        setForm({ empName: '', mobile: '', dailyWages: '' });
        const res = await getEmployees();
        setEmployees(res);
        setEditMode(false);
        setCurrentId(null);
      } catch (error) {
        setErrorMessage(`Error ${editMode ? 'updating' : 'adding'} employee: ${error.message}`);
        alert(`Error ${editMode ? 'updating' : 'adding'} employee: ${error.message}`);
      } finally {
        setLoading(false);
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
                        required
                    />
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
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                    {editMode ? 'Update Employee' : 'Add Employee'}
                </button>
            </form>
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Employee #</th>
                        <th className="px-4 py-2">Employee Name</th>
                        <th className="px-4 py-2">Mobile #</th>
                        <th className="px-4 py-2">Daily Wages</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td className="border px-4 py-2">{employee.empId}</td>
                            <td className="border px-4 py-2">{employee.empName}</td>
                            <td className="border px-4 py-2">{employee.mobile}</td>
                            <td className="border px-4 py-2">{employee.dailyWages}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleEdit(employee)} className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2">Edit</button>
                                <button onClick={() => handleDelete(employee._id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
