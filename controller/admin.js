const Account = require('../models/user');
const staff = require('../models/staff');
const trainer = require('../models/trainer');
exports.addStaff = async (req, res) =>{
    let newStaff = new staff({
        name: req.body.name,
        email:req.body.email,
        age: req.body.age,
        address:req.body.address,
    })
    let newAccount = new Account({
        email: req.body.email,
        password: "12345678",
        Role: "staff"
    })
    newStaff = await newStaff.save();
    newAccount = await newAccount.save();
    res.redirect('/admin/adminViewStaff');
}

exports.addTrainer = async (req, res) =>{
    let newTrainer = new trainer({
        name: req.body.name,
        email:req.body.email,
        speciality: req.body.speciality,
        age: req.body.age,
        address:req.body.address,
    })
    let newAccount = new Account({
        email: req.body.email,
        password: "12345678",
        Role: "trainer"
    })
    newTrainer = await newTrainer.save();
    newAccount = await newAccount.save();
    res.redirect('/admin/adminViewTrainer');
}
