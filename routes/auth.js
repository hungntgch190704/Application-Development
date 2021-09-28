const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const adminController = require('../controller/admin');
// const Staff = require('../models/staff');
// const Acc = require('../models/user');
// mongoose.connect('mongodb+srv://group1:password@cluster0.x52v4.mongodb.net/Application?retryWrites=true&w=majority')

router.post('/login', (req, res)=>{
    // let acc = new Acc({
    //     username: req.username,
    // })
    res.render('admin')
})

// router.post('/doAddStaff', (req, res)=>{
//     console.log(req.body.email);
// });

router.get('/admin/adminAddStaff', (req, res) => {
    res.render('adminAddStaff')
});

router.get('/admin/adminAddTrainer', (req, res) => {
    res.render('adminAddTrainer')
});

router.get('/admin/adminEditStaff', (req, res) => {
    res.render('adminEditStaff')
});

router.get('/admin/adminEditTrainer', (req, res) => {
    res.render('adminEditTrainer')
});

router.get('/admin/adminViewStaff', (req, res) => {
    res.render('adminViewStaff')
});

router.get('/admin/adminViewTrainer', (req, res) => {
    res.render('adminViewTrainer')
});

module.exports = router;