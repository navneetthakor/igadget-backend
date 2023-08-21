// to use router provided by express.js module 
const express = require('express');
const router = express.Router();

// to validate the parameters provided by the user 
const {body, validationResult} = require('express-validator');

// to get multiple images uploaded by user 
// const multer = require('multer');

// to get connectivity with collection of product in backend using mongooes 
const Product = require('../model/Product');


// -------------------------ROUTE:1 to add product -------------------------------------
router.post('/addprod',
[
    body("image","please provide at least 1 image").not().isEmpty(),
    body("title","please enter tiltle with min length of : 6").isLength({min:6}),
    body("description","please enter valid descretion format").not().isEmpty(),
    body("price","please enter valid price.").isNumeric()
],
// multer({
//     storage: multer.diskStorage({
//         destination: './uploads',
//         filename: (req,file,cb) => {
//             cb(null, (file.originalname + Date.now()));
//         }
//     })
// }),
async (req,res)=>{
    try{
    // check the validation for given parameters in body 
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({error: err.array(), signal: "red"});
    }

    // taking the images 
    // {it will completed letter}

    // to add product in backend 
    Product.create({
        image: req.body.image,
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
        res.status(500).json({email: "some error occured", signal: 'red'});
    }


})

module.exports = router;