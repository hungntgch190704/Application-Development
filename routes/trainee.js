const express = require('express');
const router = express.Router();
const multer = require('multer');
const traineeController = require('../controller/trainee');
const { isTrainee } =  require("../middleware/auth")

const storage = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, 'public/uploads/trainees');
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

router.get('/trainee', isTrainee, traineeController.getTrainee);

router.get('/trainee/updateProfile', isTrainee, traineeController.getProfile);

router.post('/doUpdateProfileTrainee', upload.single('picture'), isTrainee, traineeController.updateProfile);

router.get('/trainee/viewCourse', isTrainee, traineeController.viewAllCourse);

router.get('/trainee/courseDetail/view',isTrainee,  traineeController.viewCourseDetail);

router.get('/trainee/changePassword',isTrainee,  traineeController.changePassword);

router.post('/trainee/doChangePassword', isTrainee, traineeController.doChangePassword);

module.exports = router;