import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ 
    date: '', 
    customerName: '', 
    orderId: '', 
    lineItem: '', 
    description: '', 
    deliveryDate: '', 
    estimateAmount: '', 
    remarks: '' 
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('/api/orders');
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/orders', form);
    setForm({ 
      date: '', 
      customerName: '', 
      orderId: '', 
      lineItem: '', 
      description: '', 
      deliveryDate: '', 
      estimateAmount: '', 
      remarks: '' 
    });
    const res = await axios.get('/api/orders');
    setOrders(res.data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Customer Name</label>
          <input 
            type="text" 
            name="customerName" 
            value={form.customerName} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Order ID</label>
          <input 
            type="text" 
            name="orderId" 
            value={form.orderId} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Line Item</label>
          <input 
            type="text" 
            name="lineItem" 
            value={form.lineItem} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input 
            type="text" 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Delivery Date</label>
          <input 
            type="date" 
            name="deliveryDate" 
            value={form.deliveryDate} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estimate Amount</label>
          <input 
            type="text" 
            name="estimateAmount" 
            value={form.estimateAmount} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Remarks</label>
          <input 
            type="text" 
            name="remarks" 
            value={form.remarks} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Order</button>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Line Item</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Delivery Date</th>
            <th className="px-4 py-2">Estimate Amount</th>
            <th className="px-4 py-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td className="border px-4 py-2">{order.date}</td>
              <td className="border px-4 py-2">{order.customerName}</td>
              <td className="border px-4 py-2">{order.orderId}</td>
              <td className="border px-4 py-2">{order.lineItem}</td>
              <td className="border px-4 py-2">{order.description}</td>
              <td className="border px-4 py-2">{order.deliveryDate}</td>
              <td className="border px-4 py-2">{order.estimateAmount}</td>
              <td className="border px-4 py-2">{order.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;