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
        console.log('Fetched Orders:', fetchedOrders);
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
    console.log(`name: ${name}, value: ${value}`);
    setForm(prevForm => {
      const updatedForm = { ...prevForm, [name]: value };
      if (name === 'status' || name === 'estimateAmount') {
        updatedForm.value = updatedForm.status * updatedForm.estimateAmount;
      }
      console.log('updatedForm:', updatedForm);
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Daily Output</h1>
      {loading ? <p>Loading...</p> : (
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
            <label className="block text-gray-700">Employee</label>
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
          <div className="mb-4">
            <label className="block text-gray-700">Order</label>
            <select
  name="orderId"
  value={form.orderId}
  onChange={(e) => {
    const selectedOrder = orders.find(order => String(order.orderId) === String(e.target.value));
    console.log('Selected Order:', selectedOrder);
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
  className="w-full px-3 py-2 border border-gray-300 rounded-md"
  required
>
  <option value="">Select Order</option>
  {orders.map(order => (
    <option key={order._id} value={order.orderId}>
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
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Value</label>
            <input
              type="number"
              name="value"
              value={form.value}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 border-b">Date</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Employee ID</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Employee Name</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Order ID</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Line Item</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Description</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Customer Name</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Status</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Value</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dailyOutputs.map(output => (
            <tr key={output._id}>
              <td className="py-2 px-4 border-b">{new Date(output.date).toLocaleDateString('en-GB')}</td>
              <td className="py-2 px-4 border-b">{getEmployeeId(output.empId)}</td>             
               <td className="py-2 px-4 border-b">{output.empName}</td>
              <td className="py-2 px-4 border-b">{orders.orderId}</td>
              <td className="py-2 px-4 border-b">{output.lineItem}</td>
              <td className="py-2 px-4 border-b">{output.description}</td>
              <td className="py-2 px-4 border-b">{output.customerName}</td>
              <td className="py-2 px-4 border-b">{output.status}</td>
              <td className="py-2 px-4 border-b">{output.value}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  type="button" 
                  onClick={() => handleEdit(output)} 
                  className="ml-2 px-3 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  onClick={() => handleDelete(output._id)} 
                  className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
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
