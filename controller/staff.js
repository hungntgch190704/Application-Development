const Account = require('../models/user');
const trainee = require('../models/trainee');
const category = require('../models/coursecategory');
const course = require('../models/course');
const express = require('express');
//trainee
exports.viewAllTrainee = async(req,res)=>{
    let trainees = await trainee.find();
    res.render('staffTrainee', { trainees: trainees });
}
exports.addTrainee = async (req, res) =>{
    let newAccount = new Account({
        email: req.body.email,
        password: "12345678",
        Role: "trainee"
    });
    let newTrainee = new trainee({
        name: req.body.name,
        email:req.body.email,
        dateOfBirth: req.body.date,
        education:req.body.education,
    });
    newTrainee = await newTrainee.save();
    newAccount = await newAccount.save();
    console.log(newTrainee);
    res.redirect('/staff/trainee');
}
exports.editTrainee = async (req, res) =>{
    let id = req.query.id;
    let traineeEdit = await trainee.findById(id);
    console.log(traineeEdit);
    res.render('staffEditTrainee',{aTrainee: traineeEdit})
}
exports.doEditTrainee = async (req, res) =>{
    let id = req.body.id;
    let aTrainee = await trainee.findById(id);
    aTrainee.name = req.body.name;
    aTrainee.email = req.body.email;
    aTrainee.dateOfBirth = req.body.date;
    aTrainee.education = req.body.education;
    try{
        aTrainee = await aTrainee.save();
        res.redirect('/staff/trainee');
    }
    catch(error){
        console.log(error);
        res.redirect('/staff/trainee');
    }
    
}
//category
exports.viewAllCategory = async(req,res)=>{
    let categories = await category.find();
    res.render('staffCourseCategory', {categories: categories });
}
exports.addCategory = async (req, res) =>{
    let newCategory = new category({
        categoryName: req.body.name,
        description:req.body.description,
    });
    newCategory = await newCategory.save();
    res.redirect('/staff/courseCategory');
}
exports.editCategory = async (req, res) =>{
    let id = req.query.id;
    let Categoryedit = await category.findById(id);
    console.log(Categoryedit);
    res.render('staffEditCourseCategory', {aCategory: Categoryedit})
}
exports.doEditCategory = async (req, res) =>{
    let id = req.body.id;
    let aCategory = await category.findById(id);
    aCategory.categoryName = req.body.name;
    aCategory.description = req.body.description;
    try{
        aCategory = await aCategory.save();
        res.redirect('/staff/courseCategory');
    }
    catch(error){
        console.log(error);
        res.redirect('/staff/courseCategory');
    }}
    exports.deleteCategory = async (req, res) =>{
        let id = req.query.id;
        console.log(id);
        category.deleteOne({'id':id},(err) => {
            if (err)
                throw err;
            else 
                console.log('Account is deleted');
        });
        res.redirect('/staff/courseCategory');
    }
//course
exports.addCourse = async (req, res) =>{
    let newCourse = new course({
        name: req.body.name,
        category: req.body.category,
        description:req.body.description,
    })
    newCourse = await newCourse.save();
    console.log(newCourse);

    res.redirect('/staff/course');
}