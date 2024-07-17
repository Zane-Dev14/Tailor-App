const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// CRUD operations for Orders
router.post('/', orderController.createOrUpdateOrder);
router.get('/', orderController.getOrders);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
