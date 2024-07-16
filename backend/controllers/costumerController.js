const Customer = require('../models/Customer');
exports.createOrUpdateCustomer = async (req, res) => {
    const { name, mobile, place, remarks } = req.body;
    const formattedName = name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    let customer = await Customer.findOne({ name: formattedName });

    if (customer) {
        res.send(customer);
    } else {
        const lastCustomer = await Customer.findOne().sort({ customerId: -1 });
        const newCustomerId = lastCustomer ? lastCustomer.customerId + 1 : 1;
        customer = new Customer({ customerId: newCustomerId, name: formattedName, mobile, place, remarks });
        await customer.save();
        res.send(customer);
    }
};

exports.getCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
};

exports.updateCustomer = async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(customer);
};

exports.deleteCustomer = async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.send({ message: 'Customer deleted' });
};
