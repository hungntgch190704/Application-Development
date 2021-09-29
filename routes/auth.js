const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');

router.post('/login', (req, res)=>{
    res.render('admin')
})

router.post('/doAddStaff', adminController.addStaff);

router.post('/doAddTrainer', adminController.addTrainer);

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