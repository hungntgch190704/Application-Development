const mongoose = require('../db/db');

const trainerSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    speciality: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "user.png"
    }
});

module.exports = mongoose.model('Trainer', trainerSchema);