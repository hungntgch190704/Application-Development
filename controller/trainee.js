const trainee = require('../models/trainee');
const Account = require('../models/user');
const course = require('../models/course');
const courseDetail = require('../models/courseDetail')
const bcrypt = require('bcryptjs');

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
    if (req.file) {
        aTrainee.img = req.file.filename;
    }
    aTrainee.dateOfBirth = new Date(req.body.date);
    aTrainee.education = req.body.education;
    aTrainee = await aTrainee.save();
    res.redirect('/trainee');
}

//view course
exports.viewAllCourse = async(req,res)=>{
    console.log( req.session.courses)
    res.render('traineeViewCourse',{courseDetail: req.session.courses,  loginName : req.session.email})
}

//View course detail
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


//change password
exports.changePassword = async (req, res) => {
    res.render('traineeChangePass', { loginName: req.session.email })
}

//do change password
exports.doChangePassword = async (req, res) => {
    let acc = await Account.findOne({ email: req.session.email });
    let oldpw = req.body.old;
    let newpw = req.body.new;
    let confirmpw = req.body.confirm;
    let errors= {};
    let flag = true;
    try {
        await bcrypt.compare(oldpw, acc.password)
            .then((doMatch) => {
                if (doMatch) {
                    if (newpw.length < 8) {
                        flag = false;
                        Object.assign(errors, { length: "Password must contain 8 characters or more!" });
                    }
                    else if (newpw != confirmpw) {
                        flag = false;
                        Object.assign(errors, { check: "New Password and Confirm Password do not match!" });
                    }
                }
                else {
                    flag = false;
                    console.log(acc.password);
                    Object.assign(errors, { current: "Old password is incorrect!" });
                }
            });
        console.log(flag);
        console.log(errors);
        if (!flag) {
            res.render('traineeChangePass', { errors: errors, loginName: req.session.email })
        }
        else {
            await bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newpw, salt, (err, hash) => {
                    if (err) throw err;
                    acc.password = hash;
                    acc = acc.save();
                })
            });
            
            req.session.user = acc;
            res.redirect('/trainee')
        }
    } catch (err) {
        console.log(err);
        res.redirect('/trainee/changePassword')
    }
}
