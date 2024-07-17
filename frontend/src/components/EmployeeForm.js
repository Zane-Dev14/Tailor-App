import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployees, updateEmployee } from '../api/api';
import { useParams, useHistory } from 'react-router-dom';

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({ name: '', mobile: '', dailyWages: '' });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (id) {
            async function fetchEmployee() {
                const result = await getEmployees();
                const emp = result.data.find(e => e._id === id);
                setEmployee(emp);
            }
            fetchEmployee();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateEmployee(id, employee);
        } else {
            await createEmployee(employee);
        }
        history.push('/employees');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <label className="block">
            Name:
            <input type="text" name="name" value={employee.name} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </label>
        <label className="block mt-4">
            Mobile:
            <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </label>
        <label className="block mt-4">
            Daily Wages:
            <input type="text" name="dailyWages" value={employee.dailyWages} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </label>
        <button type="submit" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit
        </button>
    </form>
    );
};

export default EmployeeForm;
