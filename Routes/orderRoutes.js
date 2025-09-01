// routes/ordersRoutes.js
const express = require('express');
const router = express.Router();
const Orders = require('../App/Models/Order');

// Create a new order
router.post('/add', async (req, res) => {
  try {
    const order = new Orders(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to place order', error: err.message });
  }
});

// Get all orders (admin)
router.get('/all', async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get orders for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Orders.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user orders' });
  }
});

router.put('/status/:id', async (req, res) => {
  try {
    const updated = await Orders.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update order status', error: err.message });
  }
});

module.exports = router;
