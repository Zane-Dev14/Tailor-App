import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [date, setDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [lineItem, setLineItem] = useState(1);
    const [description, setDescription] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [estimateAmount, setEstimateAmount] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/orders', { date, customerName, lineItem, description, deliveryDate, estimateAmount, remarks });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" required />
            <input type="number" value={lineItem} onChange={(e) => setLineItem(Number(e.target.value))} min="1" placeholder="Line Item" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required />
            <input type="number" value={estimateAmount} onChange={(e) => setEstimateAmount(Number(e.target.value))} placeholder="Estimate Amount" required />
            <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default OrderForm;
