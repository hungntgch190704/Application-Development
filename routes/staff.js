const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const staffController = require('../controller/staff');
//localhost/admin
const Course = require('../models/course');

router.post('/login', (req, res)=>{
    res.redirect("/staff")
});

router.get('/staff', (req, res)=>{
    res.render('staffIndex');
})
//trainee

router.get('/staff/trainee', staffController.viewAllTrainee);
router.get('/staff/trainee/add', (req, res) => {
    res.render('staffAddTrainee')
});
router.post('/doAddTrainee', staffController.addTrainee);

router.get('/staff/trainee/edit', staffController.editTrainee);
router.post('/doEditTrainee', staffController.doEditTrainee);
router.get('/staff/trainee/delete', staffController.deleteTrainee);
//Course Category
router.get('/staff/courseCategory', staffController.viewAllCategory);

router.get('/staff/courseCategory/add', (req, res) => {
    res.render('staffAddCourseCategory')
});
router.post('/doAddCategory', staffController.addCategory);

router.get('/staff/courseCategory/edit', staffController.editCategory);
router.post('/doEditCategory', staffController.doEditCategory);
router.get('/staff/courseCategory/delete', staffController.deleteCategory);


// Course
// --------------------------------------
// --------------------------------------

// Add Course to DB
router.post('/doAddCourse', staffController.addCourse);
router.get('/staff/course/add', (req, res) => {
    res.render('staffAddCourse')
});

// Render full course information
router.get('/staff/course', async (req, res) => {
    let course = await Course.find().sort({timeCreated:'desc'});
    res.render('staffCourse',{_course: course})
});

// Edit course by ID
router.get('/staff/course/edit', async (req, res) => {
    let id = req.query.id;
    let course = await Course.findById(id);
    //console.log(course);
    res.render('staffEditCourse',{_course: course})
});

// Update course by ID
router.post('/doEditCourse', async (req, res) => {
    let id = req.body.id;

    course = await Course.findById(id);

    course.name = req.body.name;
    course.category = req.body.category;
    course.description = req.body.description;
    try{
        course = await course.save();
        res.redirect('/staff/course');
    }
    catch(error){
        console.log(error);
        res.redirect('/staff/course');
    }

});


// Search course by name
router.post('/doSearchCourse',async (req, res)=>{
    console.log(1);
    const searchText = req.body.keyword;
    console.log(searchText);
    let course = await Course.find({name: searchText}).sort({timeCreated:'desc'});
    console.log(course);
    res.render('staffCourse',{_course: course})
})

// Delete Course
router.get('/staff/course/delete', async (req, res) => {
    let id = req.query.id;
    Course.findByIdAndRemove(id).then(data={
    });
    res.redirect('/staff/course');
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