import React, { useEffect, useState } from 'react';
import { getOrders } from '../api/api';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getOrders();
            setOrders(result.data);
        }
        fetchData();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4">Order List</h2>
    <ul className="divide-y divide-gray-200">
        {orders.map(order => (
            <li key={order._id} className="py-4">
                <p className="text-lg font-medium">{order.description} - {order.amount}</p>
            </li>
        ))}
    </ul>
</div>

    );
};

export default OrderList;
