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
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={employee.name} onChange={handleChange} />
            </label>
            <label>
                Mobile:
                <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} />
            </label>
            <label>
                Daily Wages:
                <input type="text" name="dailyWages" value={employee.dailyWages} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default EmployeeForm;
