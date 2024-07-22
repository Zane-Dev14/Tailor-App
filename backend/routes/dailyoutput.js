const express = require('express');
const router = express.Router();
const dailyOutputController = require('../controllers/dailyOutputController');

// Define routes here
router.get('/', dailyOutputController.getDailyOutputs);
router.post('/', dailyOutputController.createDailyOutput);
router.put('/:id', dailyOutputController.updateDailyOutput);
router.delete('/:id', dailyOutputController.deleteDailyOutput);

module.exports = router;
