const express = require('express');
const router = express.Router();
const traineeController = require('../controller/trainee');
const { isTrainee } =  require("../middleware/auth")

router.get('/trainee', isTrainee, traineeController.getTrainee);

// router.get('/trainee/traineeEdit', isTrainee, traineeController.editTrainee);

// router.get('/trainer/ViewCourses', isTrainee, traineeController.viewCourse);

// router.post('trainee/SearchCourse', isTrainee, traineeController.searchCourse);

module.exports = router;