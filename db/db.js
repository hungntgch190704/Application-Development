const mongoose = require('mongoose');

try 
{
    const client = mongoose.connect('mongodb+srv://group1:group1@cluster0.x52v4.mongodb.net/Application', {
        useNewUrlParser: true,
        // useFindAndModify: true
    })
    console.log("connected")
} catch (e) {
    console.log(e)
}


module.exports = mongoose