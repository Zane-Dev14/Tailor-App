import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar bg-gradient-to-r from-blue-500 to-indigo-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl flex items-center">
                    <FaHome className="mr-2" />
                </Link>
                <div className="space-x-4">
                    <Link to="/employees" className="text-white text-lg hover:underline">Employees</Link>
                    <Link to="/orders" className="text-white text-lg hover:underline">Orders</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
