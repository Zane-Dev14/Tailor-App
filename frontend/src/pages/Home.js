// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to the Tailor Shop Management System</h1>
        <div className="flex space-x-4">
            <Link to="/employees" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg transition duration-300 ease-in-out">
                Manage Employees
            </Link>
            <Link to="/orders" cl   assName="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg transition duration-300 ease-in-out">
                Manage Orders
            </Link>
        </div>
    </div>

    );
};

export default Home;
