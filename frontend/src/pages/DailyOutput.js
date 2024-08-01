import React, { useState, useEffect } from 'react';
import { getDailyOutputs, createDailyOutput, updateDailyOutput, deleteDailyOutput, getEmployees, getOrders } from '../api/api';

const DailyOutput = () => {
  const [dailyOutputs, setDailyOutputs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    empId: '',
    empName: '',
    orderId: '',
    lineItemId: '',
    lineItem: '',
    description: '',
    customerName: '',
    status: 0,
    value: 0,
    estimateAmount: 0,
  });
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedDailyOutputs, fetchedEmployees, fetchedOrders] = await Promise.all([
          getDailyOutputs(),
          getEmployees(),
          getOrders()
        ]);
        setDailyOutputs(fetchedDailyOutputs);
        setEmployees(fetchedEmployees);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => {
      const updatedForm = { ...prevForm, [name]: value };

      // Update `value` when `status` or `estimateAmount` changes
      if (name === 'status' || name === 'estimateAmount') {
        updatedForm.value = updatedForm.status * updatedForm.estimateAmount;
      }
      
      return updatedForm;
    });
  };

  const handleOrderChange = (e) => {
    const [orderId, lineItemId] = e.target.value.split('-');
    const selectedOrder = orders.find(order => order._id === orderId);
    const selectedLineItem = selectedOrder?.lineItems.find(item => item.itemId === lineItemId);

    setForm(prevForm => ({
      ...prevForm,
      orderId: selectedOrder?.orderId || '',
      lineItemId: lineItemId || '',
      lineItem: selectedLineItem?.description || '',
      customerName: selectedOrder?.customerName || '',
      estimateAmount: selectedLineItem?.estimateAmount || 0,
      value: (selectedLineItem?.estimateAmount || 0) * prevForm.status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Form validation
    if (!form.date || !form.empId || !form.orderId || !form.lineItemId || !form.lineItem || !form.description || !form.customerName || form.status === '' || form.value === '') {
      setErrorMessage('Please fill out all fields.');
      setLoading(false);
      return;
    }

    if (isNaN(form.status) || isNaN(form.value)) {
      setErrorMessage('Status and Value must be numbers.');
      setLoading(false);
      return;
    }

    try {
      await createDailyOutput(form);
      const response = await getDailyOutputs();
      setDailyOutputs(response);
      setForm({
        date: new Date().toISOString().split('T')[0],
        empId: '',
        empName: '',
        orderId: '',
        lineItemId: '',
        lineItem: '',
        description: '',
        customerName: '',
        status: 0,
        value: 0,
        estimateAmount: 0,
      });
    } catch (error) {
      setErrorMessage(`Error creating daily output: ${error.message}`);
    } finally {
      setLoading(false);
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

  const populateOrderDropdown = (orders) => {
    return orders.flatMap(order =>
      order.lineItems.map(lineItem => (
        <option key={`${order._id}-${lineItem.itemId}`} value={`${order._id}-${lineItem.itemId}`}>
          {order.customerName} - {lineItem.description} ({lineItem.itemId})
        </option>
      ))
    );
  };

  const EmployeeDropdown = ({ employees, selectedEmpId, onEmpChange }) => (
    <select
      name="empId"
      value={selectedEmpId}
      onChange={onEmpChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    >
      <option value="">Select Employee</option>
      {employees.map(employee => (
        <option key={employee._id} value={employee._id}>
          {employee.empName}
        </option>
      ))}
    </select>
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Daily Output</h1>
      {loading ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Employee</label>
            <EmployeeDropdown
              employees={employees}
              selectedEmpId={form.empId}
              onEmpChange={(e) => {
                const selectedEmployee = employees.find(emp => emp._id === e.target.value);
                setForm({
                  ...form,
                  empId: selectedEmployee?._id || '',
                  empName: selectedEmployee?.empName || '',
                });
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Order</label>
            <select
              name="orderId"
              value={form.orderId ? `${form.orderId}-${form.lineItemId}` : ''}
              onChange={handleOrderChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Order</option>
              {populateOrderDropdown(orders)}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <input
              type="number"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Value</label>
            <input
              type="number"
              name="value"
              value={form.value}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      )}
      <table className="min-w-full divide-y divide-gray-200 mt-8">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-50 border-b border-gray-200">Date</th>
            <th className="py-3 px-6 bg-gray-50 border-b border-gray-200">Employee</th>
            <th className="py-3 px-6 bg-gray-50 border-b border-gray-200">Order</th>
            <th className="py-3 px-6 bg-gray-50 border-b border-gray-200">Line Item</th>
            <th className="py-3 px-6 bg-gray-50 border-b border-gray-200">Description</th>
            <th className="py-3 px-6 bg-gray-50 border-b border-gray-200">Customer</th>
            <th className="py-3 px-6 bg-gray-50 border-b border-gray-200">Status</th>
            <th className="py-3 px-6 bg-gray-50 border-b border-gray-200">Value</th>
            <th className="py-3 px-6 bg-gray-50 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dailyOutputs.map(output => (
            <tr key={output._id}>
              <td className="py-3 px-6 text-sm font-medium text-gray-900">{output.date}</td>
              <td className="py-3 px-6 text-sm text-gray-500">{output.empName}</td>
              <td className="py-3 px-6 text-sm text-gray-500">{output.orderId}</td>
              <td className="py-3 px-6 text-sm text-gray-500">{output.lineItemId}</td>
              <td className="py-3 px-6 text-sm text-gray-500">{output.lineItem}</td>
              <td className="py-3 px-6 text-sm text-gray-500">{output.customerName}</td>
              <td className="py-3 px-6 text-sm text-gray-500">{output.status}</td>
              <td className="py-3 px-6 text-sm text-gray-500">{output.value}</td>
              <td className="py-3 px-6 text-sm font-medium">
                <button
                  onClick={() => handleEdit(output)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(output._id)}
                  className="ml-4 text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyOutput;
