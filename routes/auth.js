const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');

router.post('/login', (req, res)=>{
    res.render('admin')
})

router.get('/admin/adminAddStaff', adminController.getAddStaff);

router.get('/admin/adminAddTrainer', adminController.getAddTrainer);

router.post('/doAddStaff', adminController.addStaff);

router.post('/doAddTrainer', adminController.addTrainer);

router.get('/admin/adminEditStaff', adminController.editStaff);

router.get('/admin/adminEditTrainer', adminController.editTrainer);

router.post('/admin/adminEditStaff/doEditStaff', adminController.updateStaff);

router.post('/admin/adminEditTrainer/doEditTrainer', adminController.updateTrainer);

router.get('/admin/adminViewStaff', adminController.viewStaff);

router.get('/admin/adminViewTrainer', adminController.viewTrainer);

router.get('/admin/adminDeleteStaff', adminController.deleteStaff);

router.get('/admin/adminDeleteTrainer', adminController.deleteTrainer);

module.exports = router;