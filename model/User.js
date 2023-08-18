const mongooes = require('mongoose');
const { Schema } = mongooes;

const UserSchema = new Schema ({
    name : {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now()
    }
})

module.exports = mongooes.model('User', UserSchema);

