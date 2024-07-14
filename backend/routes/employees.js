const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// CRUD operations for Employees
router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
