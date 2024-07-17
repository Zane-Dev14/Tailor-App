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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" required className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        <input type="number" value={lineItem} onChange={(e) => setLineItem(Number(e.target.value))} min="1" placeholder="Line Item" required className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        <input type="number" value={estimateAmount} onChange={(e) => setEstimateAmount(Number(e.target.value))} placeholder="Estimate Amount" required className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks" className="block mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        <button type="submit" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit
        </button>
    </form>
    
    );
};

export default OrderForm;
