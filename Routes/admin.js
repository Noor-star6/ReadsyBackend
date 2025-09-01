const express = require('express');
const router = express.Router();
const Book = require('../App/Models/Book');
const Order = require('../App/Models/Order');
const User = require('../App/Models/UsersModel');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id']; // Assume frontend sends user ID in header
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId);
    if (!user || !user.role || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Apply isAdmin middleware
router.get('/metrics', isAdmin, async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    res.json({
      books: totalBooks,
      orders: totalOrders,
      users: totalUsers,
      revenue: totalRevenue
    });
  } catch (error) {
    console.error("Admin metrics error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
