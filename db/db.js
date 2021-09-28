const mongoose = require('mongoose')

try{
    mongoose.connect('mongodb+srv://group1:group1@cluster0.x52v4.mongodb.net/Application', {
    useNewUrlParser: true,
    // useFindAndModify: true
}
)
console.log("connect success")
}catch (e) {
    console.log(e)
}

module.exports = mongoose