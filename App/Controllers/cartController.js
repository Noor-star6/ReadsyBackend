const Cart = require('../Models/Cart');

module.exports = {
  // Create or add item to cart
  addToCart: async function (req, res) {
    const { productId, quantity } = req.body;
    const userId = req.params.user_id;

    try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({
          userId,
          items: [{ productId, quantity }]
        });
      } else {
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity });
        }
      }

      await cart.save();
      res.status(200).send("Item added to cart successfully");
    } catch (err) {
      console.error("Error adding to cart:", err);
      res.status(500).send("Something went wrong!!! " + err.message);
    }
  },

  // Get all items in a user's cart
  getCart: async function (req, res) {
    const userId = req.params.user_id;

    try {
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      if (!cart) return res.status(404).send("Cart not found");
      res.send(cart);
    } catch (err) {
      res.status(500).send("Something went wrong!!! " + err.message);
    }
  },

  // Update quantity of a specific product in the cart
  updateItem: async function (req, res) {
    const { productId, quantity } = req.body;
    const userId = req.params.user_id;

    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).send("Cart not found");

      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.send("Cart item updated successfully");
      } else {
        res.status(404).send("Product not found in cart");
      }
    } catch (err) {
      res.status(500).send("Something went wrong!!! " + err.message);
    }
  },

  // Remove a product from the cart
  removeItem: async function (req, res) {
    const { user_id, product_id } = req.params;

    try {
      const cart = await Cart.findOne({ userId: user_id });
      if (!cart) return res.status(404).send("Cart not found");

      cart.items = cart.items.filter(item => item.productId.toString() !== product_id);
      await cart.save();
      res.send("Item removed from cart");
    } catch (err) {
      res.status(500).send("Something went wrong!!! " + err.message);
    }
  },

  // Clear the entire cart
  clearCart: async function (req, res) {
    const userId = req.params.user_id;

    try {
      await Cart.findOneAndDelete({ userId });
      res.send("Cart cleared successfully");
    } catch (err) {
      res.status(500).send("Something went wrong!!! " + err.message);
    }
  }
};
