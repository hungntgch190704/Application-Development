const express = require('express');
const router = express.Router();
const staffController = require('../controller/staff');
const category = require('../models/coursecategory');
const { isStaff } =  require("../middleware/auth");


router.get('/staff', isStaff, staffController.staffindex);
router.get('/staff/updateProfile', isStaff, staffController.updateProfile);
router.post('/staff/doUpdateProfile', isStaff, staffController.doUpdateProfile);
router.get('/staff/changePassword', isStaff, staffController.changePassword);
router.post('/staff/doChangePassword', isStaff, staffController.doChangePassword);
//trainee
router.get('/staff/trainee', isStaff,  staffController.viewAllTrainee);
router.get('/staff/trainee/add', isStaff,  staffController.addTrainee);
router.post('/doAddTrainee', isStaff,  staffController.doAddTrainee);
router.get('/staff/trainee/edit', isStaff,  staffController.editTrainee);
router.post('/doEditTrainee', isStaff, staffController.doEditTrainee);
router.get('/staff/trainee/delete', isStaff,  staffController.deleteTrainee);
router.post('/searchTrainee', isStaff,  staffController.searchTrainee);
//Course Category
router.get('/staff/courseCategory', isStaff,  staffController.viewAllCategory);
router.get('/staff/courseCategory/add', isStaff,  staffController.addCategory);
router.post('/doAddCategory', isStaff,  staffController.doAddCategory);
router.get('/staff/courseCategory/edit', isStaff,  staffController.editCategory);
router.post('/doEditCategory', isStaff, staffController.doEditCategory);
router.get('/staff/courseCategory/delete', isStaff,  staffController.deleteCategory);
router.post('/searchCategory', isStaff,  staffController.searchCategory);
// Course
// --------------------------------------
// --------------------------------------

// Add Course to DB
router.post('/doAddCourse', isStaff,  staffController.addCourse);

// Click add
router.get('/staff/course/add',isStaff, async (req, res) => {
    let categories = await category.find();
    res.render('staffAddCourse',{_categories: categories,loginName : req.session.email});
});

// View full course information
router.get('/staff/course', isStaff,  staffController.viewAllCourse);

// Edit course by ID
router.get('/staff/course/edit',isStaff,  staffController.clickEditCourse);

// Update course by ID
router.post('/doEditCourse',isStaff, staffController.doEditCourse);

// Search course by name
router.post('/doSearchCourse',isStaff,  staffController.doSearchCourse);

// Delete Course
router.get('/staff/course/delete',isStaff,  staffController.doDeleteCourse);

// Course Detail
// --------------------------------------
// --------------------------------------

// Add course detail
router.post('/doAddCourseDetail',isStaff,  staffController.addCourseDetail);
router.get('/staff/AssignT',isStaff, async (req, res) => {
    let categories = await category.find();
    res.render('staffAssignT',{_categories: categories,loginName : req.session.email})
});

// View Course detail information
router.get('/staff/CourseDetail',isStaff,  staffController.viewAllCourseDetail);

// Delete course/trainer in course detail
router.get('/staff/courseDetail/delete',isStaff,  staffController.deleteCourseDetail);

// View course detail
router.get('/staff/courseDetail/view',isStaff,  staffController.viewInsideCourseDetail);

// Delete a trainee in course detail
router.post('/doDeleteTraineeCourse' ,isStaff,  staffController.deleteTraineeCourseDetail);

// Search couse name in course detail
router.post('/doSearchCourseDetail',isStaff,  staffController.searchCourseDetail);

module.exports = router;