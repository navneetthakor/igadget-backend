// to use the express 
const express = require('express');
const router = express.Router;

// to validate the given parameter in request 
const {body, validationResult } = require('express-validator');

//importing the model of admin
// as it only one who can provide the connectivity with the admin collection in mongoDB
const Admin = require('../model/Admin');

// to encrypt the password 
const bcrypt = require('bcryptjs');

// to provide authentication token 
const jwt = require('jsonwebtoken');




// --------------------------------ROUTE:1 admin signup -----------------------------------
router.post('/createadmin',
[
    body('name', "Please enter name ").isEmpty(),
    body('email', "enter a valid email").isEmail(),
    body('password', "please enter password with length more then 6 ").isLength({min:6})
],
async (req,res)=>{
    try {
    //cheking the validation satisfaction that we have specified above
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({error: err.array(), signal: 'red'});
    }

    //cheking whether any admin exists with the same email
    const admin = await Admin.findOne({email: req.body.email});
    if(admin){
        return res.status(400).json({error: "Admin with the same email already exists", signal: 'red'});
    }

    // encrypt the password 
    const salt = await bcrypt.genSaltSync(10);
    const securepas = await bcrypt.hashSync(req.body.password, salt);

    // creating the Admin for mongoose schema (it will add new this details in database directly.)
    Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: securepas
    })

    //jsonwebtoken related
    const data = {
        admin:{
            id: Admin.id
        }
    }
    const jwt_secret = "tonystarkismyrolemodel";
    const authtoken = jwt.sign(data, jwt_secret);
    res.send({authtoken: authtoken, signal: 'green'});

    }catch(e){
        console.log(error);
        res.status(500).json({email: "some error occured", signal: 'red'});
    }

})


// ----------------------------------ROUTE:2 admin login (No previous login require)-------------------

router.post('/login',
[
    body("email","please enter valid email ").isEmail(),
    body("password", "Please enter valid pasword ").isEmpty()
],
async(req,res)=>{
    try {
        //cheking the validation satisfaction that we have specified above
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({error: err.array(), signal: 'red'});
        }

        //destructuring the email and password from request
        const {email, password} = req.body;

        // admin exists or not (check for email)
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({error: "please enter correct credentials"});
        }

        // password correct or not (check for password)
        const passCompare = await bcrypt.compare(password, admin.password);
        if(!passCompare){
            return res.status(400).json({error: "please enter correct credentials"});
        }

        // now, email and password both are correct so allow admin to login 
        // jsonwebtoken related 
        const data = {
            admin: {
                id: admin.id
            }
        }
        const jwt_secret = "tonystarkismyrolemodel";
        const authtoken = jwt.sign(data, jwt_secret);
        res.send({authtoken: authtoken, signal: 'green'});
        

    }catch(e){
        console.log(error);
        res.status(500).send("some error occured");
    }
})