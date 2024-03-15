const express = require('express');

const router = express.Router();
const productsRoutes = require('./products');
const usersRoutes = require('./users');

router.use('/products', productsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
