const Account = require('../models/user');
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

exports.viewCourse = async(req,res)=>{
    let courses = await course.find();
    res.render('trainerViewCourse', {course: courses, loginName : req.session.email})
}

//search course
exports.searchCourse = async (req, res) => {
    const searchText = req.body.keyword;
    console.log(searchText);
    const searchCondition = new RegExp(searchText, 'i')
    let course = await course.find({ name: searchCondition });
    console.log(course);
    res.render('trainerViewCourse', { _course: course, loginName: req.session.email })
}
    

//course details
exports.viewAssignedCourse = async (req, res) => {
    let username = req.session.email;
    let aTrainer = await trainer.findOne({email: username});
    let courses = await courseDetail.find({trainer : aTrainer.name});
    console.log(courses);
    // req.session.courses = courses;
    res.render('trainerAssignedCourse', { course_detail: courses, loginName: req.session.email});
}

exports.viewAssignedCourseDetail = async (req, res) => {
    let id = req.query.id;
    let course_detail = await courseDetail.findById(id);
    let trainees_detail = [];
    for (let item of course_detail.trainees) {
        try {
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

exports.searchCourseDetail = async (req, res) => {
    const searchText = req.body.keyword;
    console.log(searchText);
    const searchCondition = new RegExp(searchText, 'i')
    let course_detail = await courseDetail.find({ name: searchCondition });
    console.log(course_detail);
    res.render('trainerAssignedCourse', { _course_detail: course_detail, _keyword: searchText, loginName: req.session.email });
}


//trainee
exports.viewTrainee = async (req, res) => {
    let trainees = await trainee.find();
    res.render('trainerViewTrainee', {trainees: trainees, loginName : req.session.email});
}   

//trainer
exports.updateTrainer = async (req, res) =>{
    let aTrainer = await trainer.findOne({ email: req.session.email });
    res.render('trainerProfileUpdate',{aTrainer: aTrainer, loginName : req.session.email})
}

exports.doUpdateTrainer = async (req, res) =>{
    let id = req.body.id;
    let aTrainer = await trainer.findById(id);
    console.log(aTrainer)
    if(req.file){
        aTrainer.img = req.file.filename;
        console.log(req.file.filename);
    }
    console.log(req.body.name);
    aTrainer.name = req.body.name;
    aTrainer.email = req.body.email;
    aTrainer.speciality = req.body.speciality;
    aTrainer.age = req.body.age;
    aTrainer.address = req.body.address;
    try{
        aTrainer = await aTrainer.save();
        res.redirect('/trainer');
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

//change password
exports.changePassword = async (req, res) => {
    res.render('trainerChangePass', { loginName: req.session.email })
}

//do change password
exports.doChangePassword = async (req, res) => {
    let acc = Account.findOne({ email: req.session.email });
    let current = req.body.current;
    let newpw = req.body.new;
    let confirm = req.body.confirm;
    let errors=[];
    let flag = true;
    try{
        Account.findOne({email:req.session.email})
        .then(user => {
            bcrypt.compare(current, user.password)
            .then((doMatch) => {
                if(doMatch) {
                    if(newpw.length <8){
                        flag=false;
                        errors[length] = "Password must contain 8 characters or more!";
                    }
                    if(newpw != confirm){
                        flag=false;
                        errors[check] = "New Password and Confirm Password do not match!"
                    }
                }
                else{
                    flag = false;
                    errors[current] = "Old password is incorrect!";
                }
            })
        })
    } catch(err){
        console.log(err);
    }
    if(!flag){
        res.render('changePass', {errors: errors, loginName: req.session.email})
    }
    else{
        try{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newpw, salt, (err, hash) => {
                    if(err) throw err;
                    acc.password = hash;
                    acc =  acc.save();
                    req.session.user = acc;
                    res.redirect('/trainer')
                })
            })
        } catch (err) {
            console.log(err);
            res.redirect('/trainer/changePassword')
        }
    }
    // let acc = await Account.findOne({ email: req.session.email });
    // let password = acc.password;
    // let oldpw = req.body.old;
    // let newpw = req.body.new;
    // let confirmpw = req.body.confirm;
    // if (password != oldpw) {
    //     let error = "Old password is incorrect!"
    //     res.render('trainerChangePass', { error1: error, loginName: req.session.email })
    // }
    // else if (newpw.length < 8) {
    //     let error = "Password must contain 8 characters or more!"
    //     res.render('trainerChangePass', { error2: error, loginName: req.session.email })
    // }
    // else if (newpw != confirmpw) {
    //     let error = "New Password and Confirm Password do not match!"
    //     res.render('trainerChangePass', { error3: error, loginName: req.session.email })
    // }
    // else {
    //     acc.password = newpw;
    //     let confirm = "Password changed successfully"
    //     res.render('trainerChangePass', { confirm: confirm, loginName: req.session.email })
    //     try {
    //         acc = await acc.save();
    //         req.session.user = acc;
    //         res.redirect('/trainer');
    //     }
    //     catch (error) {
    //         console.log(error);
    //         res.redirect('/trainer/changePassword');
    //     }
    // }
}
