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
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer Name" required />
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" required />
            <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Place" required />
            <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks" />
            <button type="submit">Submit</button>
        </form>
    );
};
export default CustomerForm;
