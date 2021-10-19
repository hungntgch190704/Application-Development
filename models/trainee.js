const mongoose = require('../db/db');

const traineeSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    education:{
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "user.png"
    }
});


module.exports = mongoose.model('Trainees', traineeSchema);