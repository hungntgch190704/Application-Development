const Account = require('../models/user');
const staff = require('../models/staff');
const express = require('express');
exports.addUser = async (req, res) =>{
    let newStaff = new staff({
        name: req.body.name,
        email:req.body.email,
        age: req.body.age,
        address:req.body.address,
    })
    newStaff = await newStaff.save();
    console.log(newStaff);
    // console.log(req.body.email);
    res.redirect('/admin/adminViewStaff');
}