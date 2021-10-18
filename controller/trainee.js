const trainee = require('../models/trainee');
const course = require('../models/course');

const express = require('express');

exports.getTrainee = async (req, res) =>{
    res.render('traineeIndex', {loginName : req.session.email});
}

//view profile
exports.getProfile = async(req,res)=>{
    let aTrainee = await trainee.findOne({"_id" : ObjectID(req.query.id)})
    res.render('traineeIndex',{_aTrainee: aTrainee, loginName : req.session.email});
}

// view course details
exports.viewAllCourseDetail = async (req, res) => {
    let coursedetail = await courseDetail.find();
    res.render('trainerViewCourse',{_courseDetail: coursedetail})
}

//view course
exports.viewCourse = async(req,res)=>{
    let course = await course.find();
    res.render('trainerViewCourse', {course: course, loginName : req.session.email})
}

