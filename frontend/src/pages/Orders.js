import React, { useState, useEffect } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder, getCustomers } from '../api/api';  // Assuming you have a getCustomers API call

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
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
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await getCustomers();  // Fetch all customers
        setCustomers(res);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchOrders();
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format customer name
      const formattedName = form.customerName
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Check if customer exists
      const customerExists = customers.some(customer => customer.name === formattedName);

      if (!customerExists) {
        alert('Customer does not exist');
        return;
      }

      const orderData = { ...form };
      if (editMode) {
        await updateOrder(currentId, orderData);
        setEditMode(false);
        setCurrentId(null);
      } else {
        await createOrder(orderData);
      }

      // Clear form and fetch updated orders
      setForm({
        date: '',
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
      <div>
        <h2 className="text-xl font-bold mb-4">Existing Orders</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Customer Name</th>
              <th className="border px-4 py-2">Line Item</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Delivery Date</th>
              <th className="border px-4 py-2">Estimate Amount</th>
              <th className="border px-4 py-2">Remarks</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{order.customerName}</td>
                <td className="border px-4 py-2">{order.lineItem}</td>
                <td className="border px-4 py-2">{order.description}</td>
                <td className="border px-4 py-2">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{order.estimateAmount}</td>
                <td className="border px-4 py-2">{order.remarks}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleEdit(order)} 
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(order._id)} 
                    className="bg-red-600 text-white px-2 py-1 rounded-md ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
