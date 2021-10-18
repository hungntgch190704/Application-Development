const trainer = require('../models/trainer');
const trainee = require('../models/trainee');
const course = require('../models/course');
const category = require('../models/coursecategory');
const courseDetail = require('../models/courseDetail')
const validation = require('./validation');

exports.getTrainer = async(req,res)=>{
    let email = req.session.email;
    let aTrainer = await trainer.find({email : email});
    res.render('trainerViewProfile',  {aTrainer: aTrainer, loginName : req.session.email});
}
// //view profile
// exports.getProfile = async(req,res)=>{
//     let aTrainer = await trainer.findOne({"_id" : ObjectID(req.query.id)})
//     res.render('trainerIndex',{_aTrainer: aTrainer, loginName : req.session.email});
// }

//viewAllCategory
exports.viewAllCategory = async (req, res) => {
    let categories = await category.find();
    res.render('trainerCategory', { categories: categories , loginName : req.session.email});
}

exports.searchCategory = async (req, res) => {
    const searchText = req.body.keyword;
    const searchCondition = new RegExp(searchText,'i')
    let categories = await category.find({categoryName: searchCondition});
    res.render('trainerCategory', { categories: categories, loginName : req.session.email});
}


//search course
exports.searchCourse = async (req, res) => {
    const searchText = req.body.keyword;
    let listCourse;
    let checkAlphaName = validation.checkAlphabet(searchText);
    let checkEmpty = validation.checkEmpty(searchText);
    const searchCondition = new RegExp(searchText,'i');

    if(!checkEmpty){
        res.redirect('/trainer/ViewCourse');
    }
    else if(checkAlphaName){
        listCourse = await course.find({name: searchCondition});
    }
    res.render('trainerViewCourse', { courses: listCourse, loginName : req.session.email });
}

//view course details

exports.viewAssignedCourseDetail = async (req, res) => {
    let name = req.session.name;
    let aTrainer = await trainer.find({name : name},{name : 1});
    let course_detail = await courseDetail.find({trainer : aTrainer});
    res.render('trainerAssingedCourse', { course_detail: course_detail, loginName: req.session.email});
}

exports.viewCourseDetail = async (req, res) => {
    let id = req.query.id;
    let course_detail = await courseDetail.findById(id);
    let trainees_detail = [];
    for (let item of course_detail.trainees) {
        try {
            //console.log(item);
            let a_trainee = await trainee.findOne({ name: item });
            trainees_detail.push(a_trainee);
        }
        catch (error) {
            console.log(error);
        }
    }
    res.render('trainerViewCourseDetail', {
        course_detail: course_detail,
        trainees_detail: trainees_detail,
        loginName: req.session.email
    });
}

exports.viewCourse = async(req,res)=>{
    let courses = await course.find();
    res.render('trainerViewCourse', {courses: courses, loginName : req.session.email})
}

//trainee
exports.viewTrainee = async (req, res) => {
    let trainees = await trainee.find();
    res.render('trainerViewTrainee', {trainees: trainees, loginName : req.session.email});
}   

//trainer
exports.updateTrainer = async (req, res) =>{
    let id = req.query.id;
    let aTrainer = await trainer.findById(id);
    res.render('trainerProfileUpdate',{aTrainer: aTrainer, loginName : req.session.email})
}

exports.doUpdateTrainer = async (req, res) =>{
    let email = req.query.email;
    let aTrainer = await trainer.find(email);
    aTrainer.name = req.body.name;
    aTrainer.email = req.body.email;
    aTrainer.speciality = req.body.speciality;
    aTrainer.age = req.body.age;
    aTrainer.address = req.body.address;
    try{
        aTrainer = await aTrainer.save();
        res.redirect('/trainer');;
    }
    catch(error){
        console.log(error);
        res.redirect('/trainer/trainerEdit');
    }
}

//search trainee
exports.searchTrainee= async (req, res) => {
    const searchText = req.body.keyword;
    let trainees;
    let  checkAlphaName = validation.checkAlphabet(searchText);
    let checkEmpty = validation.checkEmpty(searchText);
    const searchCondition = new RegExp(searchText,'i');

    if(!checkEmpty){
        res.redirect('/trainer/viewTrainee');
    }
    else if(!checkAlphaName){
        let finddate = new Date(searchText);
        trainees = await trainee.find({dateOfBirth: finddate});
    }
    else{
        trainees = await trainee.find({name: searchCondition});
    } 
    res.render('trainerViewTrainee', { trainees: trainees , loginName : req.session.email});
}