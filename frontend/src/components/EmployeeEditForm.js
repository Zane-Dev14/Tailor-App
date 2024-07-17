import React, { useState, useEffect } from 'react';
import axios from 'axios';
const EmployeeEditForm = ({ match }) => {
    const [employee, setEmployee] = useState({ empName: '', mobile: '', dailyWages: '' });

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await axios.get(`/api/employees/${match.params.id}`);
            setEmployee(response.data);
        };

        fetchEmployee();
    }, [match.params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/employees/${match.params.id}`, employee);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <input type="text" name="empName" value={employee.empName} onChange={handleChange} placeholder="Employee Name" required className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} placeholder="Mobile Number" required className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            <input type="number" name="dailyWages" value={employee.dailyWages} onChange={handleChange} placeholder="Daily Wages" required className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            <button type="submit" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Update
            </button>
        </form>
    );
};

export default EmployeeEditForm;
