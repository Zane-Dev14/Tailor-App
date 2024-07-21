import React, { useState, useEffect } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../api/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    date: '',
    customerId: '',
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
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateOrder(currentId, form);
        setEditMode(false);
        setCurrentId(null);
      } else {
        await createOrder(form);
      }
      setForm({
        date: '',
        customerId: '',
        customerName: '',
        lineItem: '',
        description: '',
        deliveryDate: '',
        estimateAmount: '',
        remarks: ''
      });
      const res = await getOrders();
      setOrders(res);
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} order:`, error);
    }
  };

  const handleEdit = (order) => {
    setEditMode(true);
    setCurrentId(order._id);
    setForm({
      date: order.date,
      customerId: order.customerId,
      customerName: order.customerName,
      lineItem: order.lineItem,
      description: order.description,
      deliveryDate: order.deliveryDate,
      estimateAmount: order.estimateAmount,
      remarks: order.remarks
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      const res = await getOrders();
      setOrders(res);
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
    <label className="block text-gray-700">Customer ID</label>
    <input 
      type="number" 
      name="customerId" 
      value={form.customerId} 
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
      type="number" 
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
      type="number" 
      name="estimateAmount" 
      value={form.estimateAmount} 
      onChange={handleChange} 
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700">Remarks</label>
    <textarea 
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
            <th className="px-4 py-2">Order #</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order.orderId}</td>
              <td className="border px-4 py-2">{order.customerName}</td>
              <td className="border px-4 py-2">{order.description}</td>
              <td className="border px-4 py-2">{order.deliveryDate}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(order)} className="bg-yellow-500 text-white px-2 py-1 rounded-md">Edit</button>
                <button onClick={() => handleDelete(order._id)} className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
