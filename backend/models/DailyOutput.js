const mongoose = require('mongoose');

const dailyOutputSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, required: true },
  empId: { type: String, required: true },
  empName: { type: String, required: true },
  orderId: { type: String, required: true },
  lineItem: { type: Number, required: true },
  description: { type: String, required: true },
  customerName: { type: String, required: true },
  status: { type: Number, required: true, default: 0 },
  value: { type: Number, required: true }
});

const DailyOutput = mongoose.model('DailyOutput', dailyOutputSchema);
module.exports = DailyOutput;
