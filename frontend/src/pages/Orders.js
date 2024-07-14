import React from 'react';
import OrderList from '../components/OrderList';
import { Link } from 'react-router-dom';

const Orders = () => (
    <div>
        <h1>Orders</h1>
        <Link to="/order/new">Add New Order</Link>
        <OrderList />
    </div>
);

export default Orders;
