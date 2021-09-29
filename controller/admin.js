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

    res.redirect('/admin/adminViewStaff');
}

