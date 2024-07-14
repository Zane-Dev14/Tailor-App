const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    empId: Number,
    name: String,
    mobile: String,
    dailyWages: Number
});
module.exports = mongoose.model('Employee', EmployeeSchema);
