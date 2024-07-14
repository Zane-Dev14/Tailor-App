const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.send(order);
};

exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
};

exports.updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(order);
};

exports.deleteOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.send({ message: 'Order deleted' });
};
