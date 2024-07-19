const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  customerId: { type: Number, required: true },
  customerName: { type: String, required: true },
  orderId: { type: Number, unique: true },
  lineItem: { type: Number, required: true },
  description: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  estimateAmount: { type: Number, required: true },
  remarks: { type: String }
});

OrderSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  const lastOrder = await mongoose.model('Order').findOne().sort({ orderId: -1 });
  this.orderId = lastOrder ? lastOrder.orderId + 1 : 1;
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
