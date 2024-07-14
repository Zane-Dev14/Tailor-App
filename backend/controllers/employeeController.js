const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.send(employee);
};

exports.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.send(employees);
};

exports.updateEmployee = async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(employee);
};

exports.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.send({ message: 'Employee deleted' });
};
