const express = require('express');
const router = express.Router();
const staffController = require('../controller/staff');
const category = require('../models/coursecategory');

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

// Click add
router.get('/staff/course/add', async (req, res) => {
    let categories = await category.find();
    res.render('staffAddCourse',{_categories: categories});
});

// View full course information
router.get('/staff/course', staffController.viewAllCourse);

// Edit course by ID
router.get('/staff/course/edit', staffController.clickEditCourse);

// Update course by ID
router.post('/doEditCourse', staffController.doEditCourse);

// Search course by name
router.post('/doSearchCourse', staffController.doSearchCourse);

// Delete Course
router.get('/staff/course/delete', staffController.doDeleteCourse);

// Course Detail
// --------------------------------------
// --------------------------------------

// Add course detail
router.post('/doAddCourseDetail', staffController.addCourseDetail);
router.get('/staff/AssignT', async (req, res) => {
    let categories = await category.find();
    res.render('staffAssignT',{_categories: categories})
});

// View Course detail information
router.get('/staff/CourseDetail', staffController.viewAllCourseDetail);

// Delete course/trainer in course detail
router.get('/staff/courseDetail/delete', staffController.deleteCourseDetail);

// View course detail
router.get('/staff/courseDetail/view', staffController.viewInsideCourseDetail);

// Delete a trainee in course detail
router.post('/doDeleteTraineeCourse' , staffController.deleteTraineeCourseDetail);

// Search couse name in course detail
router.post('/doSearchCourseDetail', staffController.searchCourseDetail);

module.exports = router;