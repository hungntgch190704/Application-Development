const express = require('express');
const app = express()
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index1')
});

app.use(express.static(__dirname + '/public'));
var adminController = require('./routes/auth.js');
app.use('/', adminController);

app.use(express.static(__dirname + '/public'));
var staffController = require('./routes/staff.js');
app.use('/', staffController)

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('listening on port' + PORT);