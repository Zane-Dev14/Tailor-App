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
        <div className="max-w-2xl mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4">Employee List</h2>
    <ul className="divide-y divide-gray-200">
        {employees.map(emp => (
            <li key={emp._id} className="py-4">
                <p className="text-lg font-medium">{emp.name}</p>
                <p className="text-gray-500">{emp.mobile} - {emp.dailyWages}</p>
            </li>
        ))}
    </ul>
</div>

    );
};

export default EmployeeList;
