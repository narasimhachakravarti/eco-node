const Product = require('../model/products');
let sockets = new Set();
exports.postProduct = function (req, res) {
    console.log(req.body);
    let product = new Product(
        {
            name: req.body.name,
            quantity: req.body.quantity,
        }
    );
    product.save().then(
        result => {
            res.send(result);
            console.log(result);
        }
    )
};

exports.getProducts = function (req, res) {
    console.log("coming here");
        Product.find().then(
        result => {
            res.send(result);
        }
    )
}
