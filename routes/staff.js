const express = require('express');
const router = express.Router();

//localhost/admin

router.get('/staff', (req, res)=>{
    res.render('staffIndex')
})

router.post('/login', (req, res)=>{
    res.redirect("/staff")
})
router.get('/staff/trainee', (req, res) => {
    res.render('staffTrainee')
});
router.get('/staff/courseCategory', (req, res) => {
    res.render('staffCourseCategory')
});
router.get('/staff/courseCategory/add', (req, res) => {
    res.render('staffAddCourseCategory')
});
router.get('/staff/course', (req, res) => {
    res.render('staffCourse')
});


module.exports = router;