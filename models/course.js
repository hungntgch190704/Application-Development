const mongoose = require('../db/db');

const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Course', courseSchema);