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
        <form onSubmit={handleSubmit}>
            <input type="text" name="empName" value={employee.empName} onChange={handleChange} placeholder="Employee Name" required />
            <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} placeholder="Mobile Number" required />
            <input type="number" name="dailyWages" value={employee.dailyWages} onChange={handleChange} placeholder="Daily Wages" required />
            <button type="submit">Update</button>
        </form>
    );
};

export default EmployeeEditForm;
