const Order = require('../models/Order');
const Customer = require('../models/Customer');

// Create or update an order
exports.createOrder = async (req, res) => {
    const { date, lineItem, description, deliveryDate, estimateAmount, remarks } = req.body;
  
    try {
      const lastOrder = await Order.findOne().sort({ orderId: -1 });
      const newOrderId = lastOrder ? lastOrder.orderId + 1 : 1;
  
      const order = new Order({
        date,
        orderId: newOrderId,
        lineItem,
        description,
        deliveryDate,
        estimateAmount,
        remarks
      });
  
      await order.save();
      res.status(201).send(order);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };
  

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { date, customerName, lineItem, description, deliveryDate, estimateAmount, remarks } = req.body;
  const formattedName = customerName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  try {
    let customer = await Customer.findOne({ name: formattedName });
    if (!customer) {
      const lastCustomer = await Customer.findOne().sort({ customerId: -1 });
      const newCustomerId = lastCustomer ? lastCustomer.customerId + 1 : 1;
      customer = new Customer({ customerId: newCustomerId, name: formattedName, mobile: '', place: '', remarks: '' });
      await customer.save();
    }

    const order = await Order.findByIdAndUpdate(id, {
      date,
      customerId: customer.customerId,
      customerName: formattedName,
      lineItem,
      description,
      deliveryDate,
      estimateAmount,
      remarks
    }, { new: true });

    if (!order) {
      return res.status(404).send({ message: `Order with ID ${id} not found.` });
    }

    res.send(order);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).send({ message: `Order with ID ${id} not found.` });
    }

    res.send({ message: `Order with ID ${id} deleted successfully.` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
