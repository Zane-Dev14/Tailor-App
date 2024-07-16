// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Tailor Shop Management System</h1>
            <div className="button-container">
                <Link to="/employees" className="home-button">Manage Employees</Link>
                <Link to="/orders" className="home-button">Manage Orders</Link>
            </div>
        </div>
    );
};

export default Home;
