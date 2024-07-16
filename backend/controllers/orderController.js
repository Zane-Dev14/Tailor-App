const Order = require('../models/Order');
const Customer = require('../models/Customer');
exports.createOrUpdateOrder = async (req, res) => {
    const { date, customerName, lineItem, description, deliveryDate, estimateAmount, remarks } = req.body;
    const formattedName = customerName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    let customer = await Customer.findOne({ name: formattedName });
    if (!customer) {
        const lastCustomer = await Customer.findOne().sort({ customerId: -1 });
        const newCustomerId = lastCustomer ? lastCustomer.customerId + 1 : 1;
        customer = new Customer({ customerId: newCustomerId, name: formattedName, mobile: '', place: '', remarks: '' });
        await customer.save();
    }
    const lastOrder = await Order.findOne().sort({ orderId: -1 });
    const newOrderId = lastOrder ? lastOrder.orderId + 1 : 1;
    const order = new Order({ date, customerId: customer.customerId, customerName: formattedName, orderId: newOrderId, lineItem, description, deliveryDate, estimateAmount, remarks });
    await order.save();
    res.send(order);
};
exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
};
