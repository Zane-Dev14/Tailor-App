import React, { useState, useEffect } from 'react';
import { getEmployees, getOrders, createDailyOutput, getDailyOutputs, updateDailyOutput, deleteDailyOutput } from '../api/api';

const DailyOutput = () => {
  const [dailyOutputs, setDailyOutputs] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    empId: '',
    empName: '',
    orderId: '',
    lineItem: '',
    description: '',
    customerName: '',
    status: 0,
    value: 0,
    estimateAmount: 0,
  });
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedDailyOutputs, fetchedEmployees, fetchedOrders] = await Promise.all([
          getDailyOutputs(),
          getEmployees(),
          getOrders()
        ]);
        console.log('Fetched Employees:', fetchedEmployees); // Check the structure of this data
        setDailyOutputs(fetchedDailyOutputs);
        setEmployees(fetchedEmployees);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => {
      const updatedForm = { ...prevForm, [name]: value };
      if (name === 'status' || name === 'estimateAmount') {
        updatedForm.value = updatedForm.status * updatedForm.estimateAmount;
      }
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDailyOutput(form);
      const fetchedDailyOutputs = await getDailyOutputs();
      setDailyOutputs(fetchedDailyOutputs);
      setForm({
        date: new Date().toISOString().split('T')[0],
        empId: '',
        empName: '',
        orderId: '',
        lineItem: '',
        description: '',
        customerName: '',
        status: 0,
        value: 0,
        estimateAmount: 0,
      });
    } catch (error) {
      console.error("Error creating daily output:", error);
    }
  };

  const handleEdit = (output) => {
    setForm({
      ...output,
      date: output.date.split('T')[0],
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDailyOutput(id);
      setDailyOutputs(dailyOutputs.filter(output => output._id !== id));
    } catch (error) {
      console.error("Error deleting daily output:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Daily Output</h1>
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
          <label className="block text-gray-700">Employee</label>
          <select
            name="empId"
            value={form.empId}
            onChange={(e) => {
              const selectedEmp = employees.find(emp => emp.empId === e.target.value);
              if (selectedEmp) {
                setForm(prevForm => ({
                  ...prevForm,
                  empId: selectedEmp.empId,
                  empName: selectedEmp.name
                }));
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.empId} value={emp.empId}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Order</label>
          <select
            name="orderId"
            value={form.orderId}
            onChange={(e) => {
              const selectedOrder = orders.find(order => order._id === e.target.value);
              if (selectedOrder) {
                setForm(prevForm => ({
                  ...prevForm,
                  orderId: selectedOrder._id,
                  lineItem: selectedOrder.lineItem,
                  customerName: selectedOrder.customerName,
                  description: selectedOrder.description,
                  estimateAmount: selectedOrder.estimateAmount,
                  value: selectedOrder.estimateAmount * prevForm.status
                }));
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Order</option>
            {orders.map(order => (
              <option key={order._id} value={order._id}>
                {order.description}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            type="number"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Value</label>
          <input
            type="number"
            name="value"
            value={form.value}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Daily Output</button>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Employee ID</th>
            <th className="px-4 py-2">Employee Name</th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Line Item</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(dailyOutputs) && dailyOutputs.length > 0 ? (
            dailyOutputs.map((output) => (
              <tr key={output._id}>
                <td className="border px-4 py-2">{output.date.split('T')[0]}</td>
                <td className="border px-4 py-2">{output.empId}</td>
                <td className="border px-4 py-2">{output.empName}</td>
                <td className="border px-4 py-2">{output.orderId}</td>
                <td className="border px-4 py-2">{output.lineItem}</td>
                <td className="border px-4 py-2">{output.description}</td>
                <td className="border px-4 py-2">{output.customerName}</td>
                <td className="border px-4 py-2">{output.status}</td>
                <td className="border px-4 py-2">{output.value}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(output)}
                    className="bg-green-600 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(output._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="border px-4 py-2 text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DailyOutput;
