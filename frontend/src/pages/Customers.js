import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api/api';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ name: '', mobile: '', place: '', remarks: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await getCustomers();
                setCustomers(res);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const formatName = (name) => {
      return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      setLoading(true);
    
      const formattedName = formatName(form.name);
    
      try {
        const existingCustomer = customers.find(cust => cust.name === formattedName);
    
        if (existingCustomer) {
          setErrorMessage('Customer already exists. Please edit the existing customer.');
          setLoading(false);
          alert('Customer already exists. Please edit the existing customer.'); // Add alert here
          return; // Prevent further execution
        }
    
        if (editMode) {
          await updateCustomer(currentId, { ...form, name: formattedName });
        } else {
          const lastCustomer = customers[customers.length - 1];
          const newCustomerId = lastCustomer ? lastCustomer.customerId + 1 : 1;
          await createCustomer({ ...form, name: formattedName, customerId: newCustomerId });
        }
    
        // Clear form and fetch updated customer list
        setForm({ name: '', mobile: '', place: '', remarks: '' });
        const res = await getCustomers();
        setCustomers(res);
        setEditMode(false);
        setCurrentId(null);
      } catch (error) {
        setErrorMessage(`Error ${editMode ? 'updating' : 'adding'} customer: ${error.message}`);
        alert(`Error ${editMode ? 'updating' : 'adding'} customer: ${error.message}`); // Add alert here
      } finally {
        setLoading(false);
      }
    };
    

    const handleEdit = (customer) => {
        setEditMode(true);
        setCurrentId(customer._id);
        setForm({ name: customer.name, mobile: customer.mobile, place: customer.place, remarks: customer.remarks });
    };

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            const res = await getCustomers();
            setCustomers(res);
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };
    return (
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 min-h-screen flex items-center justify-center p-6">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Customers</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Customer Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 bg-white bg-opacity-20 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 bg-white bg-opacity-20 text-white"
                  pattern="[0-9]{10}"
                  required
                  title="Please enter a 10-digit mobile number"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Place</label>
                <input
                  type="text"
                  name="place"
                  value={form.place}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 bg-white bg-opacity-20 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 bg-white bg-opacity-20 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
              >
                {editMode ? 'Update Customer' : 'Add Customer'}
              </button>
            </form>
            <div className="mt-8 overflow-x-auto bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
              <table className="min-w-full text-white">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <th className="px-4 py-3">Customer #</th>
                    <th className="px-4 py-3">Customer Name</th>
                    <th className="px-4 py-3">Mobile #</th>
                    <th className="px-4 py-3">Place</th>
                    <th className="px-4 py-3">Remarks</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer._id} className="even:bg-white even:bg-opacity-20 odd:bg-white odd:bg-opacity-10">
                      <td className="border-t border-gray-300 px-4 py-3">{customer.customerId}</td>
                      <td className="border-t border-gray-300 px-4 py-3">{customer.name}</td>
                      <td className="border-t border-gray-300 px-4 py-3">{customer.mobile}</td>
                      <td className="border-t border-gray-300 px-4 py-3">{customer.place}</td>
                      <td className="border-t border-gray-300 px-4 py-3">{customer.remarks}</td>
                      <td className="border-t border-gray-300 px-4 py-3 flex space-x-2">
                        <button
                          onClick={() => handleEdit(customer)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(customer._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
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
        </div>
      );
    }      

export default Customers;
  