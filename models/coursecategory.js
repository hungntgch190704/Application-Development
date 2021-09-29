const mongoose = require('../db/db');

const categorySchema = new mongoose.Schema({
    categoryName: { 
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('course categories', categorySchema);