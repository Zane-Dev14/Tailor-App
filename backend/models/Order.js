const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    orderId: Number,
    description: String,
    amount: Number,
    employeeId: Number,
    date: Date
});
module.exports = mongoose.model('Order', OrderSchema);
