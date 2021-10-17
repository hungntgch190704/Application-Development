const express = require('express');
const router = express.Router();
const trainerController = require('../controller/trainer');
const { isTrainer } =  require("../middleware/auth")

router.get('/trainer', isTrainer, trainerController.getTrainer);

router.get('/trainer/trainerEdit', isTrainer, trainerController.editTrainer);

router.post('/trainer/trainerEdit/doEditTrainer', isTrainer, trainerController.updateTrainer);

router.get('/trainer/ViewCourses', isTrainer, trainerController.viewCourse);

router.post('trainer/SearchCourse', isTrainer, trainerController.searchCourse);

router.get('/trainer/viewTrainee', isTrainer, trainerController.viewTrainee);

router.get('/trainer/trainerCategory', isTrainer, trainerController.viewAllCategory);

router.post('/trainer/searchCategory', isTrainer,  trainerController.searchCategory);

module.exports = router;