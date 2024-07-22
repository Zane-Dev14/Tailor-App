import React, { useState, useEffect } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder, getCustomers } from '../api/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    date: '',
    customerName: '',
    lineItems: [{ description: '', estimateAmount: '' }],
    deliveryDate: '',
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
        const res = await getCustomers();
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

  const handleLineItemChange = (index, e) => {
    const { name, value } = e.target;
    const newLineItems = form.lineItems.map((item, i) => (i === index ? { ...item, [name]: value } : item));
    setForm({ ...form, lineItems: newLineItems });
  };

  const addLineItem = () => {
    setForm({ ...form, lineItems: [...form.lineItems, { description: '', estimateAmount: '' }] });
  };

  const removeLineItem = (index) => {
    const newLineItems = form.lineItems.filter((_, i) => i !== index);
    setForm({ ...form, lineItems: newLineItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedName = form.customerName
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const customerExists = customers.some(customer => customer.name === formattedName);

      if (!customerExists) {
        alert('Customer does not exist');
        return;
      }

      const orderData = { ...form, customerName: formattedName };
      if (editMode) {
        await updateOrder(currentId, orderData);
        setEditMode(false);
        setCurrentId(null);
      } else {
        await createOrder(orderData);
      }

      setForm({
        date: '',
        customerName: '',
        lineItems: [{ description: '', estimateAmount: '' }],
        deliveryDate: '',
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
      lineItems: order.lineItems,
      deliveryDate: order.deliveryDate,
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
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Customer Name</label>
          <select 
            name="customerName" 
            value={form.customerName} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
            required
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer._id} value={customer.name}>{customer.name}</option>
            ))}
          </select>
        </div>
        {form.lineItems.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">Line Item {index + 1}</label>
            <input 
              type="text" 
              name="description" 
              placeholder="Description" 
              value={item.description} 
              onChange={(e) => handleLineItemChange(index, e)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2" 
              required 
            />
            <input 
              type="number" 
              name="estimateAmount" 
              placeholder="Estimate Amount" 
              value={item.estimateAmount} 
              onChange={(e) => handleLineItemChange(index, e)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md" 
              required 
            />
            {form.lineItems.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeLineItem(index)} 
                className="mt-2 px-3 py-2 bg-red-500 text-white rounded-md"
              >
                Remove Line Item
              </button>
            )}
          </div>
        ))}
        <button 
          type="button" 
          onClick={addLineItem} 
          className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Line Item
        </button>
        <div className="mb-4">
          <label className="block text-gray-700">Delivery Date</label>
          <input 
            type="date" 
            name="deliveryDate" 
            value={form.deliveryDate} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
            required 
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
        <button 
          type="submit" 
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {editMode ? 'Update Order' : 'Create Order'}
        </button>
      </form>
      <div>
      <h2 className="text-xl font-bold mb-4">Existing Orders</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Customer #</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Order #</th>
            <th className="py-2 px-4 border-b">Line Item</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Delivery Date</th>
            <th className="py-2 px-4 border-b">Estimate Amount</th>
            <th className="py-2 px-4 border-b">Remarks</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            order.lineItems.map(item => (
              <tr key={`${order._id}-${item.lineItem}`}>
                <td className="py-2 px-4 border-b">{new Date(order.date).toLocaleDateString('en-GB')}</td>
                <td className="py-2 px-4 border-b">{order.customerId}</td>
                <td className="py-2 px-4 border-b">{order.customerName}</td>
                <td className="py-2 px-4 border-b">{order.orderId}</td>
                <td className="py-2 px-4 border-b">{item.lineItem}</td>
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b">{new Date(order.deliveryDate).toLocaleDateString('en-GB')}</td>
                <td className="py-2 px-4 border-b">{item.estimateAmount}</td>
                <td className="py-2 px-4 border-b">{order.remarks}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    type="button" 
                    onClick={() => handleEdit(order)} 
                    className="ml-2 px-3 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDelete(order._id)} 
                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  </div>
);  
};

export default Orders;
