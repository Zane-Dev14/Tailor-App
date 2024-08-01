import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout'; // Adjust the path as needed

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/" className="text-white">Home</Link>
                    <Link to="/employees" className="text-white">Employees</Link>
                    <Link to="/customers" className="text-white">Customers</Link>
                    <Link to="/orders" className="text-white">Orders</Link>
                    <Link to="/dailyoutputs" className="text-white">Daily Output</Link>
                </div>
                <LogoutButton />
            </div>
        </nav>
    );
};

export default Navbar;
