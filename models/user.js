const mongoose = require('../db/db');

const accSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    Role:{
        type: String,
        required: true
    }},
)

module.exports = mongoose.model('User', accSchema);