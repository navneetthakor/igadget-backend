const mongoose = require('mongoose');
const { Schema } = mongoose;

productSchema = Schema({
    image: [{
        type:Buffer,
        require: true
    }],
    title:{
        type: String,
        require: true,
    },
    description:{
        overview: {
            company: {type: String},
            model: {type: String},
            height: {type: Number},
            width: {type: String},
            other: [{
                type: String,
                require: true
            }]
        },
        brief: {type: String},
        require: true
    },
    dummyPrice:{
        type: Number,
    },
    price:{
        type: Number,
        require: true
    },
    rating: [{
        userId: { type: mongoose.Types.ObjectId },
        rating: { type: Number },
        comment: { type: String }
    }]
})

module.exports = mongoose.model('Product', productSchema);