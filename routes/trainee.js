const express = require('express');
const router = express.Router();
const traineeController = require('../controller/trainee');
const { isTrainee } =  require("../middleware/auth")
router.get('/trainee', isTrainee, traineeController.getTrainee);

router.get('/trainee/updateProfile', isTrainee, traineeController.getProfile);

router.post('/doUpdateProfileTrainee', isTrainee, traineeController.updateProfile);

router.get('/trainee/viewCourse', isTrainee, traineeController.viewAllCourse);

router.get('/trainee/courseDetail/view',isTrainee,  traineeController.viewCourseDetail);

router.get('/trainee/changePassword',isTrainee,  traineeController.changePassword);

router.post('/trainee/doChangePassword', isTrainee, traineeController.doChangePassword);

module.exports = router;