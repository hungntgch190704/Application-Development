const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');
//localhost/admin
router.post('/login', (req, res)=>{
    res.redirect("/staff")
});

router.get('/staff', (req, res)=>{
    res.render('staffIndex');
})

router.post('/doAddStaff', adminController.addUser);

router.post('/login', (req, res)=>{
    res.redirect("/staff")
})
router.get('/staff/trainee', (req, res) => {
    res.render('staffTrainee')
});

router.get('/staff/trainee/add', (req, res) => {
    res.render('staffAddTrainee')
});

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