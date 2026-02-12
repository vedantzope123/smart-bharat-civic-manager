const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// Create bill
router.post('/', async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bills for user
router.get('/user/:userId', async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.params.userId }).sort('-createdAt');
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pay bill
router.post('/:id/pay', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      {
        status: 'paid',
        paymentDate: new Date(),
        paymentMethod: req.body.paymentMethod,
        transactionId: req.body.transactionId
      },
      { new: true }
    );
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;