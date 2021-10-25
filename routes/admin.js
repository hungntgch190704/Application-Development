const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const adminController = require('../controller/admin');
const { isAdmin } = require("../middleware/auth");

const storageStaff = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, 'public/uploads/staff');
    },
    //add back the extension
    filename:function(req, file, callback){
        callback(null, Date.now()+file.originalname);
    },
})

//upload parameters for multer
const uploadStaff = multer({
    storage:storageStaff,
    limits:{
        fieldSize:1024*1024*3
    },
})

const storageTrainer = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, 'public/uploads/trainer');
    },
    //add back the extension
    filename:function(req, file, callback){
        callback(null, Date.now()+file.originalname);
    },
})

//upload parameters for multer
const uploadTrainer= multer({
    storage:storageTrainer,
    limits:{
        fieldSize:1024*1024*3
    },
})

router.get('/admin', isAdmin, adminController.getAdmin);

router.get('/admin/adminAddStaff',  isAdmin, adminController.getAddStaff);

router.get('/admin/adminAddTrainer', isAdmin, adminController.getAddTrainer);

router.post('/doAddStaff', uploadStaff.single('picture'), isAdmin, adminController.addStaff);

router.post('/doAddTrainer', uploadTrainer.single('picture'), isAdmin, adminController.addTrainer);

router.get('/admin/adminEditStaff', isAdmin, adminController.editStaff);

router.get('/admin/adminEditTrainer', isAdmin, adminController.editTrainer);

router.post('/admin/adminEditStaff/doEditStaff', uploadStaff.single('picture'), isAdmin, adminController.updateStaff);

router.post('/admin/adminEditTrainer/doEditTrainer', uploadTrainer.single('picture'), isAdmin, adminController.updateTrainer);

router.get('/admin/adminViewStaff', isAdmin, adminController.viewStaff);

router.get('/admin/adminViewTrainer', isAdmin, adminController.viewTrainer);

router.get('/admin/adminDeleteStaff', isAdmin, adminController.deleteStaff);

router.get('/admin/adminDeleteTrainer', isAdmin, adminController.deleteTrainer);

router.post('/admin/adminSearchStaff', isAdmin, adminController.searchStaff);

router.post('/admin/adminSearchTrainer', isAdmin, adminController.searchTrainer);

router.get('/admin/adminChangePassStaff', isAdmin, adminController.setDefaultPass);

router.get('/admin/changePass', isAdmin, adminController.getChangePass)

router.post('/admin/dochangePass', isAdmin, adminController.doChangePass)

module.exports = router;