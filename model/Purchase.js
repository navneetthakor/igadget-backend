const mongooes = require('mongoose');
const { Schema } = mongooes;

// schema to store the details about each purchase 
const prchsSchema = new Schema({
    uid: {
        type: mongooes.Types.ObjectId,
        require: true
    },
    pid: {
        type: mongooes.Types.ObjectId,
        require: true
    },
    quantity: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongooes.model('Purchase', prchsSchema);