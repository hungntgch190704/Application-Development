const express = require('express');
const router = express.Router();
const multer = require('multer');
const trainerController = require('../controller/trainer');
const { isTrainer } =  require("../middleware/auth")

const storage = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, 'public/uploads/trainer');
    },
    //add back the extension
    filename:function(req, file, callback){
        callback(null, Date.now()+file.originalname);
    },
})

//upload parameters for multer
const upload = multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*3
    },
})


//trainer
router.get('/trainer', isTrainer, trainerController.getTrainer);

router.get('/trainer/Profile', isTrainer, trainerController.getTrainer);

router.get('/trainer/trainerEdit', isTrainer, trainerController.updateTrainer);

router.post('/trainer/trainerEdit/doEditTrainer',upload.single('picture'), isTrainer, trainerController.doUpdateTrainer);

//course
router.get('/trainer/ViewCourses', isTrainer, trainerController.viewCourse);

router.post('/trainer/searchCourse', isTrainer, trainerController.searchCourse);

//course detail

router.get('/trainer/CourseDetail/view', isTrainer, trainerController.viewAssignedCourseDetail); 

router.get('/trainer/AssignedCourse',isTrainer, trainerController.viewAssignedCourse);

router.post('/trainer/searchCourseDetail', isTrainer, trainerController.searchCourseDetail);

//trainee
router.get('/trainer/viewTrainee', isTrainer, trainerController.viewTrainee);

router.post('/trainer/searchTrainee', isTrainer, trainerController.searchTrainee);

//category
router.get('/trainer/trainerCategory', isTrainer, trainerController.viewAllCategory);

router.post('/trainer/searchCategory', isTrainer,  trainerController.searchCategory);

//password
router.get('/trainer/changePassword',isTrainer,  trainerController.changePassword);

router.post('/trainer/doChangePassword', isTrainer, trainerController.doChangePassword);

module.exports = router;