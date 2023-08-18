// to connect with mongodb through mongooes 
const connectToMongo = require('./db');
connectToMongo();

// to connect with backend and respond to the requests
const express = require('express');
const app = express();
const port = 5000;


app.get('/',(req,res)=>{
    res.json({
        name : 'Navneet Kumar',
        id : '21CP031'
    });
})

// to start listening on port number : 5000
app.listen(port, ()=>{
    console.log("backend is active at port number : ", port);
})