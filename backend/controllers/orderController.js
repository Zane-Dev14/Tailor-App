const Order = require('../models/Order');
const Customer = require('../models/Customer'); // Add this import

const formatName = (name) => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

exports.createOrder = async (req, res) => {
  try {
    const { customerName, ...orderData } = req.body;
    const formattedName = formatName(customerName);
    const customer = await Customer.findOne({ name: formattedName });
    if (!customer) {
      return res.status(400).json({ message: 'Customer does not exist' });
    }
    // Create the order with the customer's ID
    const order = new Order({ ...orderData, customerId: customer.customerId, customerName: formattedName });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, ...orderData } = req.body;

    // Format customerName
    const formattedName = formatName(customerName);

    // Check if the customer exists
    const customer = await Customer.findOne({ name: formattedName });

    if (!customer) {
      return res.status(400).json({ message: 'Customer does not exist' });
    }

    // Update the order with the customer's ID
    const order = await Order.findByIdAndUpdate(id, { ...orderData, customerId: customer.customerId, customerName: formattedName }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};