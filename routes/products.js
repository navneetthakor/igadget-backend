// to use router provided by express.js module 
const express = require('express');
const router = express.Router();

// to validate the parameters provided by the user 
const {body, validationResult} = require('express-validator');

// to get connectivity with collection of product in backend using mongooes 
const Product = require('../model/Product');

//for admin authentication
const Admin = require('../model/Admin');

// to upload images 
// const upload = require('../middleware/fetchImages');

// importing fetchAdmin middleware
// will use it in '/getAdmin' end point
const fetchAdmin = require('../middleware/fetchAdmin');


// -------------------------ROUTE:1 to add product -------------------------------------
router.post('/addprod',
[
    body("title","please enter tiltle with min length of : 6").isLength({min:6}),
    body("description","please enter valid descretion format").not().isEmpty(),
    body("price","please enter valid price.").isNumeric()
],
// upload.array('image[]'),
fetchAdmin,
async (req,res)=>{
    try{
    // first of all check whether this request is made by admin or not 
    // fetching the id provided by fetchAdmin middleware 
    const adminId = req.admin.id;

    // gethering the details of admin with provided id 
    const admin = await Admin.findById(adminId);
    if(!admin){
       return res.status(401).json({error: "Authentication fail please login", signal: 'red'});
    }
    
    // check the validation for given parameters in body 
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({error: err.array(), signal: "red"});
    }

    // // taking the images
    // let im;
    // // to add product in backend 
    // if(req.file){
    //     im = req.file.path;
    // }
    Product.create({
        // image: im,
        title: req.body.title,
        description: req.body.description,
        dummyPrice: req.body.dummyPrice,
        price: req.body.price,
        totrating: req.body.totrating,
        ratings: req.body.ratings,
    })

    return res.json({product: Product, signal: "green"});
    }catch(e){
        console.log(e);
        res.status(500).json({email: "Internal server error", signal: 'red'});
    }


})

// -------------------------ROUTE:2 to delete product -------------------------------------
router.post('/delete:id',
fetchAdmin,
async(req,res)=>{
    try {
        // first of all check whether this request is made by admin or not 
        // fetching the id provided by fetchAdmin middleware 
        const adminId = req.admin.id;

        // gethering the details of admin with provided id 
        const admin = await Admin.findById(adminId);
        if(!admin){
            return res.status(401).json({error: "Authentication fail please login", signal: 'red'});
        }

        //finding product with provided id
        const prod = Product.findById(req.params.id);
        if(!prod){
            return res.status(400).json({error: "product with provided id not exist.", signal: "red"});
        }

        // admin autheticated and product exist in backend 
        // so all safe now delete the product 
        await Product.findByIdAndDelete(req.params.id);
        return res.json({signal: "green"});
    } catch (error) {
        console.log(e);
        res.status(500).json({email: "Internal server error", signal: 'red'});
    }
})


// -------------------------ROUTE:2 to delete product -------------------------------------
router.post('/updateprod:id',
fetchAdmin,
async(req,res)=>{
    try {
        // first of all check whether this request is made by admin or not 
        // fetching the id provided by fetchAdmin middleware 
        const adminId = req.admin.id;

        // gethering the details of admin with provided id 
        const admin = await Admin.findById(adminId);
        if(!admin){
            return res.status(401).json({error: "Authentication fail please login", signal: 'red'});
        }

        // creating a temporory product to store parameters provided in request 
        const{title, description, dummyPrice, price, totrating, ratings} = req.body;
        const prod = {}

        if(title){
            prod.title = title;
        }
        if(description){
            prod.description = description;
        }
        if(dummyPrice){
            prod.dummyPrice = dummyPrice;
        }
        if(price){
            prod.price = price;
        }
        if(totrating){
            prod.totrating = totrating;
        }
        if(ratings){
            prod.ratings = ratings;
        }

        // find product to be update 
        const findProd = Product.findById(req.params.id);
        if(!findProd){
            return res.status(400).json({error: "product not exist", signal:"red"});
        }

        // now all safe to update the product 
        const updatProd = await Product.findByIdAndUpdate(req.params.id, {$set: prod}, {new: true});
        res.json({product: updatProd, signal: "green"});
    }catch (error) {
        console.log(e);
        res.status(500).json({email: "Internal server error", signal: 'red'});
    }
})


module.exports = router;