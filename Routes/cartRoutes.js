const express = require('express');
const router = express.Router();
const cartController = require('../App/Controllers/cartController');

router.post('/:user_id', cartController.addToCart);
router.get('/:user_id', cartController.getCart);
router.put('/:user_id', cartController.updateItem);
router.delete('/:user_id/:product_id', cartController.removeItem);
router.delete('/:user_id', cartController.clearCart);

module.exports = router;
