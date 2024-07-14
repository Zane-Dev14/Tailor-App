import React from 'react';
import EmployeeList from '../components/EmployeeList';
import { Link } from 'react-router-dom';

const Employees = () => (
    <div>
        <h1>Employees</h1>
        <Link to="/employee/new">Add New Employee</Link>
        <EmployeeList />
    </div>
);

export default Employees;
