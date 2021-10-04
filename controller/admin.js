const Account = require('../models/user');
const staff = require('../models/staff');
const trainer = require('../models/trainer');
const validation = require('./validation');
const dbHandler = require('../db/dbHandler');

exports.getAdmin = async (req, res) =>{
    res.render('admin', {loginName : req.session.email})
}

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
    res.render('adminAddTrainer', {loginName : req.session.email});
}

exports.getAddStaff = async (req, res) => {
    res.render('adminAddStaff', {loginName : req.session.email});
}

//view all trainer
exports.viewTrainer = async (req, res) =>{
    let listTrainer = await trainer.find();
    res.render('adminViewTrainer', {listTrainer: listTrainer, loginName : req.session.email} )
}

//view all staff
exports.viewStaff = async (req, res) =>{
    let listStaff = await staff.find();
    res.render('adminViewStaff', {listStaff: listStaff, loginName : req.session.email})
}

exports.editStaff = async (req, res) =>{
    let id = req.query.id;
    let aStaff = await staff.findById(id);
    // console.log(aStaff);
    res.render('adminEditStaff',{aStaff: aStaff, loginName : req.session.email})
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
    res.render('adminEditTrainer',{aTrainer: aTrainer, loginName : req.session.email})
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

exports.searchStaff= async (req, res) => {
    const searchText = req.body.keyword;
    //console.log(req.body.keyword);
    let listStaff;
    let checkAlphaName = validation.checkAlphabet(searchText);
    let checkEmpty = validation.checkEmpty(searchText);
    const searchCondition = new RegExp(searchText,'i');

    //console.log(checkEmpty);
    if(!checkEmpty){
        res.redirect('/admin/adminViewStaff');
    }
    else if(checkAlphaName){
        listStaff = await staff.find({name: searchCondition});
    }
    res.render('adminViewStaff', { listStaff: listStaff , loginName : req.session.email});
}

exports.searchTrainer= async (req, res) => {
    const searchText = req.body.keyword;
    //console.log(req.body.keyword);
    let listTrainer;
    let checkAlphaName = validation.checkAlphabet(searchText);
    let checkEmpty = validation.checkEmpty(searchText);
    const searchCondition = new RegExp(searchText,'i');

    //console.log(checkEmpty);
    if(!checkEmpty){
        res.redirect('/admin/adminViewTrainer');
    }
    else if(checkAlphaName){
        listTrainer = await trainer.find({name: searchCondition});
    }
    res.render('adminViewTrainer', { listTrainer: listTrainer, loginName : req.session.email });
}

exports.setDefaultPass = async (req, res)=> {
    let id = req.query.id; 
    console.log(id);
    let aStaff = await staff.findById(id);
    let account = await Account.findOne({ 'email': aStaff.email }).exec()
    account.password = "12345678";
    try{
        account = await account.save();
        res.redirect('/admin/adminViewStaff');
    }
    catch(error){
        console.log(error);
        res.redirect('/admin/adminViewStaff');
    }
}