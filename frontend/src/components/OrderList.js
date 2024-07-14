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
        <div>
            <h2>Order List</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>{order.description} - {order.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
