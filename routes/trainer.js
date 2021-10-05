const express = require('express');
const router = express.Router();
const trainerController = require('../controller/trainer');
const { isTrainer } =  require("../middleware/auth")

router.get('/trainer', isTrainer, trainerController.getTrainer);

router.get('/trainer/trainerEdit', isTrainer, trainerController.editTrainer);

router.post('/trainer/trainerProfileUpdate/doEditTrainer', isTrainer, trainerController.updateTrainer);

router.get('/trainer/AssignedCourses', isTrainer, trainerController.viewAllCategory);

router.post('trainer/searchCourse', isTrainer, trainerController.searchCourse);

router.get('/trainer/viewTrainee', isTrainer, trainerController.viewTrainee);

module.exports = router;