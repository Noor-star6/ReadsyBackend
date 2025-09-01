const express = require('express');
const router = express.Router();
const userController = require('../App/Controllers/userController');

// User routes
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/getusers', userController.getAll);
router.get('/singleUser/:user_id', userController.getSingle);
router.delete('/deleteUser/:user_id', userController.deleteUser);
router.put('/updateUser/:user_id', userController.updateUser);



module.exports = router;
