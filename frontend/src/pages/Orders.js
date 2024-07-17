import React, { useState, useEffect } from 'react';
import api from '../api/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ 
    date: '', 
    customerName: '', 
    lineItem: '', 
    description: '', 
    deliveryDate: '', 
    estimateAmount: '', 
    remarks: '' 
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/orders/${currentId}`, form);
        setEditMode(false);
        setCurrentId(null);
      } else {
        await api.post('/orders', form);
      }
      setForm({ 
        date: '', 
        customerName: '', 
        lineItem: '', 
        description: '', 
        deliveryDate: '', 
        estimateAmount: '', 
        remarks: ''
      });
      fetchOrders(); // Fetch updated orders list
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} order:`, error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const order = orders.find(order => order.orderId === id);
      if (!order) {
        console.error(`Order with ID ${id} not found.`);
        return;
      }
      setEditMode(true);
      setCurrentId(id);
      setForm({
        date: order.date,
        customerName: order.customerName,
        lineItem: order.lineItem,
        description: order.description || '',
        deliveryDate: order.deliveryDate || '',
        estimateAmount: order.estimateAmount || '',
        remarks: order.remarks || ''
      });
    } catch (error) {
      console.error('Error editing order:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders(); // Fetch updated orders list
    } catch (error) {
      console.error('Error deleting order:', error);
    }
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          {editMode ? 'Update Order' : 'Add Order'}
        </button>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Line Item</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Delivery Date</th>
            <th className="px-4 py-2">Estimate Amount</th>
            <th className="px-4 py-2">Remarks</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td className="border px-4 py-2">{order.date}</td>
              <td className="border px-4 py-2">{order.customerName}</td>
              <td className="border px-4 py-2">{order.lineItem}</td>
              <td className="border px-4 py-2">{order.description}</td>
              <td className="border px-4 py-2">{order.deliveryDate}</td>
              <td className="border px-4 py-2">{order.estimateAmount}</td>
              <td className="border px-4 py-2">{order.remarks}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2" onClick={() => handleEdit(order.orderId)}>Edit</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded-md" onClick={() => handleDelete(order.orderId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
