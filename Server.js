const express = require('express');
const app = express();
const Jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
console.log("Running from:", __dirname);
require('./database/connection');
const User = require('./App/Models/UsersModel');

app.get('/test-users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Routes
const userRoutes = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const bookRoutes = require('./Routes/bookRoutes');
const registerRoutes = require('./Routes/registerRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const adminRoutes = require('./Routes/admin');
const orderRoutes = require('./Routes/orderRoutes');



// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB connection
require('./database/connection');

// Secret key
app.set('secret_key', "i love musaa");

// Route registration
app.use('/users', userRoutes);
app.use('/cart', validateUser, cartRoutes);
app.use('/books', bookRoutes); // 👈 Add book routes
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/admin', adminRoutes);
app.use('/orders', orderRoutes);



// Welcome route
app.get('/welcome', (req, res) => {
  res.send("welcome to NODE/EXPRESS api's");
});

// Server
app.listen(4200, () => {
  console.log('your server is running on port # 4200');
});

// JWT middleware
function validateUser(req, res, next) {
  Jwt.verify(req.headers['x-access-token'], req.app.get('secret_key'), function (err) {
    if (err) {
      res.json({ status: "Authorization failed", message: err.message });
    } else {
      next();
    }
  });
}
