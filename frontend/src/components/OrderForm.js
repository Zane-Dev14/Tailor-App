import React, { useState, useEffect } from 'react';
import { createOrder, getOrders, updateOrder } from '../api/api';
import { useParams, useHistory } from 'react-router-dom';

const OrderForm = () => {
    const [order, setOrder] = useState({ description: '', amount: '' });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (id) {
            async function fetchOrder() {
                const result = await getOrders();
                const ord = result.data.find(o => o._id === id);
                setOrder(ord);
            }
            fetchOrder();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateOrder(id, order);
        } else {
            await createOrder(order);
        }
        history.push('/orders');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Description:
                <input type="text" name="description" value={order.description} onChange={handleChange} />
            </label>
            <label>
                Amount:
                <input type="text" name="amount" value={order.amount} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default OrderForm;
