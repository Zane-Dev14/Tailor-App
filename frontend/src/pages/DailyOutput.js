import React, { useState, useEffect } from 'react';
import {
  getDailyOutputs,
  createDailyOutput,
  updateDailyOutput,
  deleteDailyOutput,
  getEmployees,
  getOrders
} from '../api/api';

const DailyOutput = () => {
  const [dailyOutputs, setDailyOutputs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedDailyOutputs, fetchedEmployees, fetchedOrders] = await Promise.all([
          getDailyOutputs(),
          getEmployees(),
          getOrders()
        ]);
        console.log('Fetched Orders:', fetchedOrders); // Confirm fetched orders
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
      if (name === 'status' || name === 'estimateAmount') {
        updatedForm.value = updatedForm.status * updatedForm.estimateAmount;
      }
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Form validation
    if (!form.date || !form.empId || !form.orderId || !form.lineItem || !form.description || !form.customerName || form.status === '' || form.value === '') {
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
    return orders.map((order) => (
      <option key={order._id} value={order.orderId}>
        {order.customerName} - {order.orderId}
      </option>
    ));
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

  const getEmployeeId = (empId) => {
    const employee = employees.find(emp => emp._id === empId);
    return employee ? employee.empId : 'N/A'; // Return 'N/A' if employee is not found
  };
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
              value={form.orderId}
              onChange={(e) => {
                const selectedOrder = orders.find(order => String(order.orderId) === String(e.target.value));
                setForm({
                  ...form,
                  orderId: selectedOrder?.orderId || '',
                  lineItem: selectedOrder?.lineItem || '',
                  customerName: selectedOrder?.customerName || '',
                  description: selectedOrder?.description || '',
                  estimateAmount: selectedOrder?.estimateAmount || 0,
                  value: (selectedOrder?.estimateAmount || 0) * form.status
                });
              }}
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
            <th className="py-3 px-6 bg-gray-50 border-b text-left text-gray-600">Date</th>
            <th className="py-3 px-6 bg-gray-50 border-b text-left text-gray-600">Employee ID</th>
            <th className="py-3 px-6 bg-gray-50 border-b text-left text-gray-600">Employee Name</th>
            <th className="py-3 px-6 bg-gray-50 border-b text-left text-gray-600">Order ID</th>
            <th className="py-3 px-6 bg-gray-50 border-b text-left text-gray-600">Line Item</th>
            <th className="py-3 px-6 bg-gray-50 border-b text-left text-gray-600">Customer Name</th>
            <th className="py-3 px-6 bg-gray-50 border-b text-left text-gray-600">Status</th>
            <th className="py-3 px-6 bg-gray-50 border-b text-left text-gray-600">Value</th>
            <th className="py-3 px-6 bg-gray-50 border-b text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dailyOutputs.map(output => (
            <tr key={output._id}>
              <td className="py-3 px-6">{output.date}</td>
              <td className="py-3 px-6">{getEmployeeId(output.empId)}</td>
              <td className="py-3 px-6">{output.empName}</td>
              <td className="py-3 px-6">{output.orderId}</td>
              <td className="py-3 px-6">{output.lineItem}</td>
              <td className="py-3 px-6">{output.customerName}</td>
              <td className="py-3 px-6">{output.status}</td>
              <td className="py-3 px-6">{output.value}</td>
              <td className="py-3 px-6">
                <button onClick={() => handleEdit(output)} className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300">Edit</button>
                <button onClick={() => handleDelete(output._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);

};

export default DailyOutput;
