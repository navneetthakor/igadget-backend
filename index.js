// to connect with mongodb through mongooes 
const connectToMongo = require('./db');
connectToMongo();

// to connect with backend and respond to the requests
const express = require('express');
const app = express();
const port = 5000;

// middleware to parse the json object 
app.use(express.json());

//middlewares to redirect at particular url
app.use('/storeadmin',require('./routes/admin'));
app.use('/users',require('./routes/user'));
app.use('/storeproducts',require('./routes/products'));
app.use('/storepurchase',require('./routes/purchase'));

// to start listening on port number : 5000
app.listen(port, ()=>{
    console.log("backend is active at port number : ", port);
})


// first part is completed on 25/08/2023 at 00:37 AM (only images part left that will be completed letter when
// I will complete the react components )