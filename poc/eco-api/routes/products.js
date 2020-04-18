const express = require('express');
const router = express.Router();

const product = require('../controllers/products');

router.post('/postProduct', product.postProduct);
router.get('/getProducts', product.getProducts)

module.exports = router;