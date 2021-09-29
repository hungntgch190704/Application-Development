const express = require('express');
const mongoose = require('./db/db');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
var hbs = require('hbs');
// register path to partials
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
    res.render('index')
});

app.use(express.static(__dirname + '/public'));
// var adminController = require('./routes/auth.js');
// app.use('/', adminController);

var staffController = require('./routes/staff.js');
app.use('/', staffController);

var trainerController = require('./routes/trainer.js');
app.use('/', trainerController);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('listening on port' + PORT);