import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [place, setPlace] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/customers', { name, mobile, place, remarks });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer Name" required className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" required className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Place" required className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks" className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            <button type="submit" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Submit
            </button>
        </form>
    );
};

export default CustomerForm;
