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
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Customer Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mobile Number</label>
                    <input
                            type="tel" 
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        pattern="[0-9]{10}" 
                        required
                         title="Please enter a 10-digit mobile number"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Place</label>
                    <input
                        type="text"
                        name="place"
                        value={form.place}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
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
                    {editMode ? 'Update Customer' : 'Add Customer'}
                </button>
            </form>
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Customer #</th>
                        <th className="px-4 py-2">Customer Name</th>
                        <th className="px-4 py-2">Mobile #</th>
                        <th className="px-4 py-2">Place</th>
                        <th className="px-4 py-2">Remarks</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td className="border px-4 py-2">{customer.customerId}</td>
                            <td className="border px-4 py-2">{customer.name}</td>
                            <td className="border px-4 py-2">{customer.mobile}</td>
                            <td className="border px-4 py-2">{customer.place}</td>
                            <td className="border px-4 py-2">{customer.remarks}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleEdit(customer)} className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2">Edit</button>
                                <button onClick={() => handleDelete(customer._id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
  