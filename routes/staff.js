const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trainee = require('../models/trainee');
const staffController = require('../controller/staff');
//localhost/admin
router.post('/login', (req, res)=>{
    res.redirect("/staff")
});

router.get('/staff', (req, res)=>{
    res.render('staffIndex');
})
//trainee

router.get('/staff/trainee', async(req, res) => {
    let trainees = await Trainee.find();
    res.render('staffTrainee', { trainees: trainees });
});

router.get('/staff/trainee/add', (req, res) => {
    res.render('staffAddTrainee')
});

router.post('/doAddTrainee', staffController.addTrainee);

router.get('/staff/trainee/edit', (req, res) => {
    res.render('staffEditTrainee')
});

//Course Category
router.get('/staff/courseCategory', (req, res) => {
    res.render('staffCourseCategory')
});

router.get('/staff/courseCategory/add', (req, res) => {
    res.render('staffAddCourseCategory')
});

router.post('/doAddCategory', staffController.addCategory);

router.get('/staff/courseCategory/edit', (req, res) => {
    res.render('staffEditCourseCategory')
});

// Course
router.get('/staff/course', (req, res) => {
    res.render('staffCourse')
});

router.get('/staff/course/add', (req, res) => {
    res.render('staffAddCourse')
});

router.get('/staff/course/edit', (req, res) => {
    res.render('staffEditCourse')
});

// Course Details
router.get('/staff/CourseDetail', (req, res) => {
    res.render('staffCourseDetail')
});

router.get('/staff/AssignT', (req, res) => {
    res.render('staffAssignT')
});

router.get('/staff/courseDetail/view', (req, res) => {
    res.render('staffViewCourseDetail')
});

module.exports = router;