const trainer = require('../models/trainer');
const trainee = require('../models/trainee');
const course = require('../models/course');
const category = require('../models/coursecategory');
const validation = require('./validation');
const express = require('express');

exports.getTrainer = async(req,res)=>{
    let aTrainer = await trainer.find();
    res.render('trainerIndex',  {aTrainer: aTrainer, loginName : req.session.email});
}
// //view profile
// exports.getProfile = async(req,res)=>{
//     let aTrainer = await trainer.findOne({"_id" : ObjectID(req.query.id)})
//     res.render('trainerIndex',{_aTrainer: aTrainer, loginName : req.session.email});
// }
//search course
exports.searchCourse = async(req,res)=>{
    console.log(1);
    const searchText = req.body.keyword;
    console.log(searchText);
    let course = await course.find({name: searchText}).sort({timeCreated:'desc'});
    console.log(course);
    res.render('trainerViewCourse',{_course: course, loginName : req.session.email})
}

exports.searchCourse = async (req, res) => {
    const searchText = req.body.keyword;
    //console.log(req.body.keyword);
    let listCourse;
    let checkAlphaName = validation.checkAlphabet(searchText);
    let checkEmpty = validation.checkEmpty(searchText);
    const searchCondition = new RegExp(searchText,'i');

    //console.log(checkEmpty);
    if(!checkEmpty){
        res.redirect('/trainer/AssignedCourses');
    }
    else if(checkAlphaName){
        listCourse = await course.find({name: searchCondition});
    }
    res.render('trainerViewCourse', { listCourse: listCourse, loginName : req.session.email });
}

exports.viewCourse = async(req,res)=>{
    let course = await course.find();
    res.render('trainerViewCourse', {_course: course, loginName : req.session.email})
}
exports.viewTrainee = async (req, res) => {
    let trainees = await trainee.find();
    res.render('trainerViewTrainee', {trainees: trainees, loginName : req.session.email});
}   

exports.editTrainer = async (req, res) =>{
    let id = req.query.id;
    let aTrainer = await trainer.findById(id);
    res.render('trainerProfileUpdate',{aTrainer: aTrainer, loginName : req.session.email})
}

exports.updateTrainer = async (req, res) =>{
    let id = req.body.id;
    let aTrainer = await trainer.findById(id);
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
