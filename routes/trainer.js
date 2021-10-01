const express = require('express');
const router = express.Router();
const trainerController = require('../controller/trainer');

router.get('/trainer', (req, res) => {
    res.render('trainerIndex')
});

router.get('/trainer/trainerEdit', (req, res) => {
    res.render('trainerProfileUpdate')
});

router.get('/trainer/viewTrainee', (req, res) => {
    res.render('trainerViewTrainee')
});

// router.get('/trainer/viewCourse', (req, res) => {
//     res.render('trainerViewCourse')
// });

router.get('/trainer/viewCourse', trainerController.viewAllCategory);

router.post('trainer/searchCourse',async (req, res)=>{
    console.log(1);
    const searchText = req.body.keyword;
    console.log(searchText);
    let course = await Course.find({name: searchText}).sort({timeCreated:'desc'});
    console.log(course);
    res.render('trainerViewCourse',{_course: course})
})


module.exports = router;