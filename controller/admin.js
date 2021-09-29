const Account = require('../models/user');
const staff = require('../models/staff');
const trainer = require('../models/trainer');
const dbo = require('../db/db');

// add new staff
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

//add new trainer
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

exports.getAddTrainer = async (req, res) => {
    res.render('adminAddTrainer');
}

exports.getAddStaff = async (req, res) => {
    res.render('adminAddStaff');
}

//view all trainer
exports.viewTrainer = async (req, res) =>{
    let listTrainer = await trainer.find();
    res.render('adminViewTrainer', {listTrainer: listTrainer})
}

//view all staff
exports.viewStaff = async (req, res) =>{
    let listStaff = await staff.find();
    res.render('adminViewStaff', {listStaff: listStaff})
}

exports.editStaff = async (req, res) =>{
    let id = req.query.id;
    let aStaff = await staff.findById(id);
    // console.log(aStaff);
    res.render('adminEditStaff',{aStaff: aStaff})
}

exports.updateStaff = async (req, res) =>{
    let id = req.body.id;
    let aStaff = await staff.findById(id);
    aStaff.name = req.body.name;
    aStaff.email = req.body.email;
    aStaff.age = req.body.age;
    aStaff.address = req.body.address;
    try{
        aStaff = await aStaff.save();
        res.redirect('/admin/adminViewStaff');
    }
    catch(error){
        console.log(error);
        res.redirect('/admin/adminViewStaff');
    }
}

exports.editTrainer = async (req, res) =>{
    let id = req.query.id;
    let aTrainer = await trainer.findById(id);
    res.render('adminEditTrainer',{aTrainer: aTrainer})
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
        res.redirect('/admin/adminViewTrainer');
    }
    catch(error){
        console.log(error);
        res.redirect('/admin/adminViewTrainer');
    }
}

exports.deleteStaff = async (req, res) => {
    let id = req.query.id;
    let aStaff = await staff.findById(id);
    let email = aStaff.email;
    console.log(email);
    Account.deleteOne({ 'email': email }, (err) => {
        if (err)
            throw err;
        else 
            console.log('Account is deleted');
    })
    staff.findByIdAndRemove(id).then(data={});
    res.redirect('/admin/adminViewStaff');
}

exports.deleteTrainer = async (req, res) => {
    let id = req.query.id;
    let aTrainer = await trainer.findById(id);
    let email = aTrainer.email;
    console.log(email);
    Account.deleteOne({ 'email': email }, (err) => {
        if (err)
            throw err;
        else 
            console.log('Account is deleted');
    })
    trainer.findByIdAndRemove(id).then(data={});
    res.redirect('/admin/adminViewTrainer');
}