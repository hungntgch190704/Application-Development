const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const adminController = require('../controller/admin');
const { isAdmin } = require("../middleware/auth");

router.get('/admin', isAdmin, adminController.getAdmin);

router.get('/admin/adminAddStaff', isAdmin, adminController.getAddStaff);

router.get('/admin/adminAddTrainer', isAdmin, adminController.getAddTrainer);

router.post('/doAddStaff', isAdmin, adminController.addStaff);

router.post('/doAddTrainer', isAdmin, adminController.addTrainer);

router.get('/admin/adminEditStaff', isAdmin, adminController.editStaff);

router.get('/admin/adminEditTrainer', isAdmin, adminController.editTrainer);

router.post('/admin/adminEditStaff/doEditStaff', isAdmin, adminController.updateStaff);

router.post('/admin/adminEditTrainer/doEditTrainer', isAdmin, adminController.updateTrainer);

router.get('/admin/adminViewStaff', isAdmin, adminController.viewStaff);

router.get('/admin/adminViewTrainer', isAdmin, adminController.viewTrainer);

router.get('/admin/adminDeleteStaff', isAdmin, adminController.deleteStaff);

router.get('/admin/adminDeleteTrainer', isAdmin, adminController.deleteTrainer);

router.post('/admin/adminSearchStaff', isAdmin, adminController.searchStaff);

router.post('/admin/adminSearchTrainer', isAdmin, adminController.searchTrainer);

router.get('/admin/adminChangePassStaff', isAdmin, adminController.setDefaultPass);

router.get('/admin/adminChangePassword', isAdmin, adminController.getChangePass)

router.post('/admin/changeAdPass', isAdmin, adminController.doChangePass)

module.exports = router;