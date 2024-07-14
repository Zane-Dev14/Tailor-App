import React, { useEffect, useState } from 'react';
import { getEmployees } from '../api/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getEmployees();
            setEmployees(result.data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map(emp => (
                    <li key={emp._id}>{emp.name} - {emp.mobile} - {emp.dailyWages}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
