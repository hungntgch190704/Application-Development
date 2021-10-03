const express = require('express');
const mongoose = require('./db/db');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
var hbs = require('hbs');
// register path to partials
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
app.use(express.static(__dirname + '/public'));
const Account = require('./models/user');
const loginController = require('./controller/login');
app.get('/', (req, res) => {
    res.render('index')
});

//app.post('/login', loginController.handleLogin);
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        let acc= await Account.findOne({email: username});
        if(acc.password ==password){
            if(acc.Role == 'staff'){
                console.log(acc.password);
                var staffController = require('./routes/staff.js');
                app.use(staffController);
                res.redirect('/staff');
            }
            else if(acc.Role == 'admin'){
                var adminController = require('./routes/auth.js');
                app.use('/', adminController);
            }
            else if(acc.Role == 'trainer'){
                var trainerController = require('./routes/trainer.js');
                app.use('/', trainerController);
            }
            else{
                var traineeController = require('./routes/trainee.js');
                app.use('/', traineeController);
            }
        }else{
            res.render('index');
        }
    }catch (error) {
        console.log(error);
        res.render('index');
    }
});
// var adminController = require('./routes/auth.js');
// app.use('/', adminController);

// var staffController = require('./routes/staff.js');
// app.use('/', staffController);

// var trainerController = require('./routes/trainer.js');
// app.use('/', trainerController);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('listening on port' + PORT);