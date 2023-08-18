const mongooes = require('mongoose');
const { Schema } = mongooes;

const AdminSchema = Schema ({
    name: {
        type: String,
        require: true
    },
    email:{
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

module.exports = mongooes.model("Admin", AdminSchema);