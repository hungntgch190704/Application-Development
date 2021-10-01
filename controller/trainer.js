const trainer = require('../models/trainer');
const course = require('../models/course');
const category = require('../models/coursecategory');
const express = require('express');
exports.editTrainer = async (req, res) =>{
    let newStaff = new staff({
        name: req.body.name,
        email:req.body.email,
        age: req.body.age,
        address:req.body.address,
    })
    res.redirect('/trainer/trainerIndex');
}
exports.viewAllCategory = async(req,res)=>{
    let categories = await category.find();
    res.render('trainerViewCourse', {categories: categories });
}
exports.viewCourse = async(req,res)=>{
    let course = await course.find();
    res.render('trainerViewCourse', {course: course})
}

