const  Jwt  = require('jsonwebtoken');
const UsersModel = require('../Models/UsersModel'); 
const bcrypt = require('bcryptjs');

module.exports = {
    create: function (req, res) {
      const user = new UsersModel(req.body);
      user.save()
        .then(result => {
          res.status(201).send("You have registered successfully");
        })
        .catch(err => {
          console.error("Error saving user:", err);
          res.status(400).json({ message: "Failed to save user", error: err.message });
        });
    },
   authenticate: async function(req, res, next) {
  try {
    const userInfo = await UsersModel.findOne({ email: req.body.email });
    if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
      const token = Jwt.sign(
        { id: userInfo._id },
        req.app.get("secret_key"),
        { expiresIn: "7d" }
      );
      res.json({ 'status': "success", message: "user found!!", token: token });
    } else {
      res.json({ 'status': "Error", message: "user can't be found" });
    }
  } catch (err) {
    next(err);
  }
},

    
  
    getAll: function(req, res) {
      UsersModel.find()
        .then(results => {
          res.status(200).json(results);
        })
        .catch(err => {
          res.send("Something went wrong!!!! " + err);
        });
    },
  
    getSingle: function(req, res) {
      UsersModel.findById(req.params.user_id)
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.send("Something went wrong!!!! " + err);
        });
    },
  
   updateUser: function(req, res) {
  UsersModel.findByIdAndUpdate(req.params.user_id, req.body, { new: true })
    .then(result => {
      res.json({ message: "User updated successfully", user: result });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user", error: err.message });
    });
},
  
   deleteUser: function(req, res) {
  UsersModel.findByIdAndDelete(req.params.user_id)
    .then(() => {
      res.json({ message: "User deleted successfully" });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user", error: err.message });
    });
}

  };
  


