const trainee = require('../models/trainee');
const category = require('../models/coursecategory');
const express = require('express');
exports.addTrainee = async (req, res) =>{
    let newTrainee = new trainee({
        name: req.body.name,
        email:req.body.email,
        dateOfBirth: req.body.date,
        education:req.body.education,
    })
    newTrainee = await newTrainee.save();
    console.log(newTrainee);
    res.redirect('/staff/trainee');
}
exports.addCategory = async (req, res) =>{
    let newCategory = new category({
        categoryName: req.body.name,
        description:req.body.description,
    })
    newCategory = await newCategory.save();
    console.log(newCategory);
    res.redirect('/staff/courseCategory');
}