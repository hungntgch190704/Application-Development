const express = require('express');
const mongoose = require('./db/db');
const bodyParser = require('body-parser');
session = require('express-session')
const app = express();
app.set('view engine', 'hbs');
var hbs = require('hbs');

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

app.use(bodyParser.urlencoded({ extended: true }));
// register path to partials
hbs.registerPartials(__dirname + '/views/partials/');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('index')
});
const authRoute = require("./routes/auth")
var adminRoute = require('./routes/admin.js');
var staffRoute = require('./routes/staff.js');
var trainerRoute = require('./routes/trainer.js');
var traineeRoute = require('./routes/trainee.js');

app.use("/", authRoute);
app.use("/",adminRoute);
app.use(staffRoute);
app.use('/', trainerRoute);
app.use('/', traineeRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('listening on port' + PORT);