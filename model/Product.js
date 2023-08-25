const mongoose = require('mongoose');
const Mixed = require('mongoose/lib/schema/mixed');
const { Schema } = mongoose;

// to use as reference (userid)
// const User = require('./User');


const productSchema = new Schema ({
    image: {
        type:Array,
        of: Buffer,
    },
    title:{
        type: String,
        require: true
    },
    description:{
        overview : {
            company: {type: String},
            model: {type: String},
            height: {type: String},
            width: {type: String},
            other: [{
                type: String,
            }]
        },
        type: Mixed,
        require: true
    },
    dummyPrice:{
        type: Number,
    },
    price:{
        type: Number,
        require: true
    },
    totrating:{
        type: Number,
        default: Number.MIN_VALUE
    },
    ratings: {
        type: Array,
        of: {
            userId: { type: mongoose.Types.ObjectId },
            rating: { type: Number },
            comment: { type: String }
        }
    }
})

module.exports = mongoose.model('Product', productSchema);