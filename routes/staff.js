const express = require('express');
const router = express.Router();
const app = express()

//localhost/admin
router.post('/login', (req, res)=>{
    res.redirect("/staff")
});

router.get('/staff', (req, res)=>{
    res.render('staffIndex')
});
//trainee
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


module.exports = router;