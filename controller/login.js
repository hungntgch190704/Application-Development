// const express = require('express');
// const bodyParser = require('body-parser');
//const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'hbs');
// var hbs = require('hbs');
// // register path to partials
// hbs.registerPartials(__dirname + '/views/partials');
// hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
// app.use(express.static(__dirname + '/public'));
// const Account = require('../models/user');
// const dbo = require('../db/db');
// exports.handleLogin = async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     try{
//         let acc= await Account.findOne({email: username});
//         if(acc.password ==password){
//             if(acc.Role == 'staff'){
//                 console.log(acc.password);
//                 var staffController = require('../routes/staff.js');
//                 app.use('/', staffController);
//                 res.redirect('/login');
//             }
//             else if(acc.Role == 'admin'){
//                 var adminController = require('./routes/auth.js');
//                 app.use('/', adminController);
//             }
//             else if(acc.Role == 'trainer'){
//                 var trainerController = require('./routes/trainer.js');
//                 app.use('/', trainerController);
//             }
//             else{
//                 var traineeController = require('./routes/trainee.js');
//                 app.use('/', traineeController);
//             }
//         }else{
//             res.render('index');
//         }
//     }catch (error) {
//         console.log(error);
//         res.render('index');
//     }
// }
// const Account = require('../models/user');

// exports.handleLogin = (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
    
//     Account.findOne({ email: username, password: password})
//     .then(user =>{
//         console.log(user)
//         return res.redirect('/staff')
//     })
//     .catch(err =>{
//         res.render('index', {errors: 'Username or password is incorrect'});
//     })
// }
