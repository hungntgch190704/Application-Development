const mongoose = require('../db/db');

const courseDetailSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    trainer:{
        type: String,
        required: true
    },
    trainees:
    [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('CourseDetail', courseDetailSchema);