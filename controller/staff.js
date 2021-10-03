const Account = require('../models/user');
const trainee = require('../models/trainee');
const category = require('../models/coursecategory');
const Course = require('../models/course');
const courseDetail = require('../models/courseDetail')
const trainer = require('../models/trainer');
const validation = require('./validation');
const dbHandler = require('../db/dbHandler');
//trainee
exports.viewAllTrainee = async (req, res) => {
    let trainees = await trainee.find();
    res.render('staffTrainee', { trainees: trainees});
}
exports.addTrainee = async (req, res) => {
    res.render('staffAddTrainee');
}
exports.doAddTrainee = async (req, res) => {

    if(validation.checkAlphabet(req.body.name)){
        let newAccount = new Account({
            email: req.body.email,
            password: "12345678",
            Role: "trainee"
        });
        let newTrainee = new trainee({
            name: req.body.name,
            email: req.body.email,
            dateOfBirth: new Date(req.body.date),
            education: req.body.education,
        });
        try {
            newTrainee = await newTrainee.save();
            newAccount = await newAccount.save();
            console.log(newTrainee);
            res.redirect('/staff/trainee');
        }
        catch (error) {
            console.log(error);
            res.redirect('/staff/trainee');
        }
    }
    else{
        res.render('staffAddTrainee');
    }
    
}
exports.editTrainee = async (req, res) => {
    let id = req.query.id;
    let traineeEdit = await trainee.findById(id);
    console.log(traineeEdit);
    res.render('staffEditTrainee', { aTrainee: traineeEdit })
}
exports.doEditTrainee = async (req, res) => {
    let id = req.body.id;
    let aTrainee = await trainee.findById(id);
    aTrainee.name = req.body.name;
    aTrainee.email = req.body.email;
    aTrainee.dateOfBirth = new ISODate(req.body.date);
    aTrainee.education = req.body.education;
    try {
        aTrainee = await aTrainee.save();
        res.redirect('/staff/trainee');
    }
    catch (error) {
        console.log(error);
        res.redirect('/staff/trainee');
    }

}
exports.deleteTrainee = async (req, res) => {
    let id = req.query.id;
    let aTrainee = await trainee.findById(id);
    let email = aTrainee.email;
    console.log(email);
    Account.deleteOne({ 'email': email }, (err) => {
        if (err)
            throw err;
        else
            console.log('Account is deleted');
    })
    trainee.findByIdAndRemove(id).then(data = {});
    res.redirect('/staff/trainee');
}
exports.searchTrainee= async (req, res) => {
    const searchText = req.body.keyword;
    //console.log(req.body.keyword);
    let trainees;
    let  checkAlphaName = validation.checkAlphabet(searchText);
    let checkEmpty = validation.checkEmpty(searchText);
    const searchCondition = new RegExp(searchText,'i');

    //console.log(checkEmpty);
    if(!checkEmpty){
        res.redirect('/staff/trainee');
    }
    else if(!checkAlphaName){
        let finddate = new Date(searchText);
        trainees = await trainee.find({dateOfBirth: finddate});
        //console.log(finddate);
    }
    else{
        trainees = await trainee.find({name: searchCondition});
    } 
    res.render('staffTrainee', { trainees: trainees });
}

//category
exports.viewAllCategory = async (req, res) => {
    let categories = await category.find();
    res.render('staffCourseCategory', { categories: categories });
}
exports.addCategory = async (req, res) => {
    res.render('staffAddCourseCategory');
}
exports.doAddCategory = async (req, res) => {
    let newCategory = new category({
        categoryName: req.body.name,
        description: req.body.description,
    });
    newCategory = await newCategory.save();
    res.redirect('/staff/courseCategory');
}
exports.editCategory = async (req, res) => {
    let id = req.query.id;
    let Categoryedit = await category.findById(id);
    console.log(Categoryedit);
    res.render('staffEditCourseCategory', { aCategory: Categoryedit })
}
exports.doEditCategory = async (req, res) => {
    let id = req.body.id;
    let aCategory = await category.findById(id);
    aCategory.categoryName = req.body.name;
    aCategory.description = req.body.description;
    try {
        aCategory = await aCategory.save();
        res.redirect('/staff/courseCategory');
    }
    catch (error) {
        console.log(error);
        res.redirect('/staff/courseCategory');
    }
}
exports.deleteCategory = async (req, res) => {
    let id = req.query.id;
    console.log(id);
    category.deleteOne({ 'id': id }, (err) => {
        if (err)
            throw err;
        else
            console.log('Category is deleted');
    });
    res.redirect('/staff/courseCategory');
}
exports.searchCategory = async (req, res) => {
    const searchText = req.body.keyword;
    //console.log(req.body.keyword);
    const searchCondition = new RegExp(searchText,'i')
    let categories = await category.find({categoryName: searchCondition});
    //console.log(categories);
    res.render('staffCourseCategory', { categories: categories });
}

// ========================= COURSE =======================================
// ========================================================================

// add course
exports.addCourse = async (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let name_category = req.body.category;
    let check = true;
    let checkAlphaName = validation.checkAlphabet(name);
    let checkAlphaDes = validation.checkAlphabet(description);
    console.log(checkAlphaDes);
    check &= checkAlphaName & checkAlphaDes;
    console.log(check);
    if (!check) {
        let categories = await category.find();
        err_courseName = "", err_description = "";
        if (!checkAlphaName) err_courseName = "You must enter characters in alphabet";
        if (!checkAlphaDes) err_description = "You must enter characters in alphabet";
        res.render('staffAddCourse',{
                   errors: {err_courseName,err_description},
                   old: {name,description},
                   _categories: categories
        });
    }
    else {
        let newCourse = new Course({
            name: name,
            category: name_category,
            description: description
        })
        try {
            newCourse = await newCourse.save();
            console.log(newCourse);

        }
        catch (error) {
            console.log(error);
        }
        res.redirect('/staff/course');
    }

}

// View all course
exports.viewAllCourse = async (req, res) => {
    let course = await Course.find();
    res.render('staffCourse',{_course: course})
}

// Click Edit Course
exports.clickEditCourse = async (req, res) => {
    let id = req.query.id;
    let course = await Course.findById(id);
    let categories = await category.find();
    //console.log(course);
    res.render('staffEditCourse',{_course: course, _categories: categories})
}

// Do Edit Course 
exports.doEditCourse = async (req, res) => {
    let id = req.body.id;

    course = await Course.findById(id);

    course.name = req.body.name;
    course.category = req.body.category;
    course.description = req.body.description;
    try{
        course = await course.save();
        res.redirect('/staff/course');
    }
    catch(error){
        console.log(error);
        res.redirect('/staff/course');
    }
}

// Seach Course 
exports.doSearchCourse = async (req, res) => {
    const searchText = req.body.keyword;
    console.log(searchText);
    const searchCondition = new RegExp(searchText,'i')
    let course = await Course.find({name: searchCondition});
    console.log(course);
    res.render('staffCourse',{_course: course})
}

// Delete Course
exports.doDeleteCourse = async (req, res) => {
    let id = req.query.id;
    Course.findByIdAndRemove(id).then(data={
    });
    res.redirect('/staff/course');
}


// ========================= COURSE DETAIL ================================
// ========================================================================

// Add Course Detail
exports.addCourseDetail = async (req, res) => {
    let course_name = req.body.name;
    let name_category = req.body.category;
    let name_trainer = req.body.trainer;
    let name_trainee = req.body.trainee;
    let check = true;
    let check_courseName = await dbHandler.checkExisted(course, course_name) !== null;
    let check_trainerName = await dbHandler.checkExisted(trainer, name_trainer) !== null;
    let check_traineeName = await dbHandler.checkExisted(trainee, name_trainee) !== null;
    check &= check_courseName & check_trainerName & check_traineeName;
    console.log(check);
    if (!check) {
        let categories = await category.find();
        err_courseName = "", err_trainerName = "", err_traineeName = "";
        if (!check_courseName) err_courseName = "Course name is not exist!";
        if (!check_trainerName) err_trainerName = "Trainer name is not exist!";
        if (!check_traineeName) err_traineeName = "Trainee name is not exist!";
        res.render('staffAssignT', {
            _categories: categories,
            old: { course_name, name_trainer, name_trainee },
            errors: { err_courseName, err_trainerName, err_traineeName }
        })
    }
    else {
        await courseDetail.findOne({ $and: [{ 'name': course_name }, { 'category': name_category }, { 'trainer': name_trainer }] }).then(data => {
            if (data) {
                try {
                    data.trainees.push(name_trainee);
                    data.save();
                    console.log(1);
                }
                catch (error) {
                    console.log(error);
                }

            }
            else {
                let newCourseDetail = new courseDetail({
                    name: course_name,
                    category: name_category,
                    trainer: name_trainer,
                    trainees: name_trainee
                })
                try {
                    newCourseDetail.save();
                }
                catch (error) {
                    console.log(error);
                }

            }
        });
        res.redirect('/staff/courseDetail');
    }
}

// View All Course Details
exports.viewAllCourseDetail = async (req, res) => {
    let course_detail = await courseDetail.find();
    res.render('staffCourseDetail',{_course_detail: course_detail})
}

// Delete Course Details
exports.deleteCourseDetail = async (req, res) => {
    let id = req.query.id;
    await courseDetail.findByIdAndRemove(id).then(data={});
    res.redirect('/staff/courseDetail');
}

// View Inside A Course Detail
exports.viewInsideCourseDetail = async (req, res) => {
    let id = req.query.id;
    let course_detail = await courseDetail.findById(id);
    let trainees_detail = [];
    for(let item of course_detail.trainees) {
        try{
            //console.log(item);
            let a_trainee = await trainee.findOne({name: item});
            trainees_detail.push(a_trainee);
        }
        catch(error){
            console.log(error);
        }
    }
    res.render('staffViewCourseDetail',{_course_detail: course_detail,
                                        _trainees_detail: trainees_detail});
}

// Delete a trainee in course details
exports.deleteTraineeCourseDetail = async (req, res) => {
    let id = req.body.id;
    // if(req.body.hasOwnProperty(1)){
    //     console.log("butt1 clicked");
    // }
    // console.log(id);
    let course_detail = await courseDetail.findById(id);
    let index = 0;
    for(let i = 0; i < course_detail.trainees.length;i++){
        if(req.body.hasOwnProperty(i)){
            index = i;
            break;
        }
    }
    console.log(course_detail.trainees[index]);
    await courseDetail.findByIdAndUpdate(
        {_id: id},
        {$pull: {trainees: course_detail.trainees[index]}}
    )
    res.redirect('/staff/CourseDetail');
}

// Search Course Name in Course Details
exports.searchCourseDetail = async (req, res) =>{
    const searchText = req.body.keyword;
    console.log(searchText);
    const searchCondition = new RegExp(searchText,'i')
    let course_detail = await courseDetail.find({name: searchCondition});
    console.log(course_detail);
    res.render('staffCourseDetail',{_course_detail: course_detail, _keyword: searchText});
}