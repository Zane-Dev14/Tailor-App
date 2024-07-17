const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  customerId: { type: Number, required: true },
  customerName: { type: String, required: true },
  orderId: { type: Number, required: true },
  lineItem: { type: Number, required: true },
  description: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  estimateAmount: { type: Number, required: true },
  remarks: { type: String }
});

module.exports = mongoose.model('Order', OrderSchema);
