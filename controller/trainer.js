const trainer = require('../models/trainer');

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
