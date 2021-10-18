const trainee = require('../models/trainee');
const course = require('../models/course');
const courseDetail = require('../models/courseDetail')

const express = require('express');

exports.getTrainee = async (req, res) =>{
    res.render('traineeIndex', {loginName : req.session.email});
}

//view profile
exports.getProfile = async(req,res)=>{
    let aTrainee = await trainee.findOne({email : req.session.email})
    res.render('traineeProfileUpdate',{ aTrainee: aTrainee, loginName : req.session.email});
}

//update profile
exports.updateProfile = async(req,res)=>{
    let id = req.body.id;
    let aTrainee = await trainee.findById(id);
    aTrainee.name = req.body.name;
    aTrainee.dateOfBirth = new Date(req.body.date);
    aTrainee.education = req.body.education;
    aTrainee = await aTrainee.save();
    res.redirect('/trainee');
}

exports.viewCourseDetail= async(req,res)=>{
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
    res.render('traineeViewCourseDetail', {
        _course_detail: course_detail,
        _trainees_detail: trainees_detail,
        loginName: req.session.email
    });
}

//view course
exports.viewAllCourse = async(req,res)=>{
    console.log( req.session.courses)
    res.render('traineeViewCourse',{courseDetail: req.session.courses,  loginName : req.session.email})
}

//change password
exports.changePassword = async (req, res) => {
    res.render('traineeChangePass', { loginName: req.session.email })
}

//do change password
exports.doChangePassword = async (req, res) => {
    let acc = await Account.findOne({ email: req.session.email });
    let password = acc.password;
    let oldpw = req.body.old;
    let newpw = req.body.new;
    let confirmpw = req.body.confirm;
    if (password != oldpw) {
        let error = "Old password is incorrect!"
        res.render('staffChangePassword', { error1: error, loginName: req.session.email })
    }
    else if (newpw.length < 8) {
        let error = "Password must contain 8 characters or more!"
        res.render('staffChangePassword', { error2: error, loginName: req.session.email })
    }
    else if (newpw != confirmpw) {
        let error = "New Password and Confirm Password do not match!"
        res.render('staffChangePassword', { error3: error, loginName: req.session.email })
    }
    else {
        acc.password = newpw;
        try {
            acc = await acc.save();
            req.session.user = acc;
            res.redirect('/staff');
        }
        catch (error) {
            console.log(error);
            res.redirect('/staff/changePassword');
        }
    }
}
