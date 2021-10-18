const express = require('express');
const router = express.Router();
const trainerController = require('../controller/trainer');
const { isTrainer } =  require("../middleware/auth")

//trainer
router.get('/trainer', isTrainer, trainerController.getTrainer);

router.get('/trainer/Profile', isTrainer, trainerController.getTrainer);

router.get('/trainer/trainerEdit', isTrainer, trainerController.updateTrainer);

router.post('/trainer/trainerEdit/doEditTrainer', isTrainer, trainerController.doUpdateTrainer);

//course
router.get('/trainer/ViewCourses', isTrainer, trainerController.viewCourse);

router.post('trainer/SearchCourse', isTrainer, trainerController.searchCourse);

//trainee
router.get('/trainer/viewTrainee', isTrainer, trainerController.viewTrainee);

router.post('/trainer/searchTrainee', isTrainer, trainerController.searchTrainee);

//category
router.get('/trainer/trainerCategory', isTrainer, trainerController.viewAllCategory);

router.post('/trainer/searchCategory', isTrainer,  trainerController.searchCategory);



module.exports = router;