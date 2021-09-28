const mongoose = require('../db/db');

const accSchema = new mongoose.Schema({
    Username:{
        type: String, 
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        unique: true
    },
    Role:{
        type: String,
        required: true
    }},
)

module.exports = mongoose.model('User', accSchema);