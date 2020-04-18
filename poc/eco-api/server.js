const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const user = require('./routes/users');
const product = require('./routes/products');


const Product = require('./model/products');



const app = express();

const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

let sockets = new Set();

let allproduct;

let socketAll;

const db = "mongodb+srv://admin:admin@cluster0-pvipx.mongodb.net/eco?retryWrites=true";

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(db, err => {
  if (err) {
    console.log("Connot connect to Database " + err)
  }
  else {
    console.log("Database Connected")
  }
})


app.post('/api/socket', (req, res) => {
  allproduct.push(req.body.number)
})


var corsOptions = {
  origin: "http://18.223.110.224"
};

io.on('connection', socket => {
  sockets.add(socket);
  // socket.emit('data', { data: products });
  // socket.on('clientData', data => console.log(data));
  // socket.on('disconnect', () => sockets.delete(socket));
});
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.send("hello")
})

app.post('/product/postProduct', (req, res) => {
  console.log("coming here")
  let product = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    price : req.body.price,
  });
  console.log(product);
  product.save().then(
    result => {
      console.log(result);
      for (const socket of sockets) {
        console.log(`Emitting value: ${result}`);
        socket.emit('data', { data: result });
      }
      res.json(result);
    }
  ).catch((err) => {
    res.send(err)
  })
})


app.use('/user', user);
app.use('/product', product);





const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
