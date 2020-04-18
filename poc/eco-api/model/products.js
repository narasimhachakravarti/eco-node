const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Products = new Schema({
    name: {type: String, required: true, max: 100},
    quantity : {type: String},
    price : {type: String}
});

module.exports = mongoose.model('Products', Products);