const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  userId: String,
  status: { type: String, default: "Pending" }
});
module.exports = mongoose.model('Orders', orderSchema);
