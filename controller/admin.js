const Account = require('../models/user');
const staff = require('../models/staff');
const trainer = require('../models/trainer');
const validation = require('./validation');
const courseDetail = require('../models/courseDetail');
const bcrypt = require('bcryptjs');

exports.getAdmin = async (req, res) => {
    res.render('admin', { loginName: req.session.email })
}

// add new staff
exports.addStaff = (req, res) => {
    let newStaff = new staff({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        address: req.body.address,
        img: req.file.filename
    })
    let newAccount = new Account({
        email: req.body.email,
        password: "12345678",
        Role: "staff"
    })
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAccount.password, salt, (err, hash) => {
            if (err) throw err;
            newAccount.password = hash;
            newStaff = newStaff.save();
            newAccount = newAccount.save();
        })
    })
    res.redirect('/admin/adminViewStaff');
}

//add new trainer
exports.addTrainer = (req, res) => {
    let newTrainer = new trainer({
        name: req.body.name,
        email: req.body.email,
        speciality: req.body.speciality,
        age: req.body.age,
        address: req.body.address,
        img: req.file.filename
    })
    let newAccount = new Account({
        email: req.body.email,
        password: "12345678",
        Role: "trainer"
    })
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAccount.password, salt, (err, hash) => {
            if (err) throw err;
            newAccount.password = hash;
            newTrainer = newTrainer.save();
            newAccount = newAccount.save();
        })
    })
    res.redirect('/admin/adminViewTrainer');
}

exports.getAddTrainer = async (req, res) => {
    res.render('adminAddTrainer', { loginName: req.session.email });
}

exports.getAddStaff = async (req, res) => {
    res.render('adminAddStaff', { loginName: req.session.email });
}

//view all trainer
exports.viewTrainer = async (req, res) => {
    let listTrainer = await trainer.find();
    res.render('adminViewTrainer', { listTrainer: listTrainer, loginName: req.session.email })
}

//view all staff
exports.viewStaff = async (req, res) => {
    let listStaff = await staff.find();
    res.render('adminViewStaff', { listStaff: listStaff, loginName: req.session.email })
}

exports.editStaff = async (req, res) => {
    let id = req.query.id;
    let aStaff = await staff.findById(id);
    // console.log(aStaff);
    res.render('adminEditStaff', { aStaff: aStaff, loginName: req.session.email })
}

exports.updateStaff = async (req, res) => {
    let id = req.body.id;
    let aStaff = await staff.findById(id);
    if (req.file) {
        aStaff.img = req.file.filename;
    }
    aStaff.name = req.body.name;
    aStaff.email = req.body.email;
    aStaff.age = req.body.age;
    aStaff.address = req.body.address;

    try {
        aStaff = await aStaff.save();
        res.redirect('/admin/adminViewStaff');
    }
    catch (error) {
        console.log(error);
        res.redirect('/admin/adminViewStaff');
    }
}

exports.editTrainer = async (req, res) => {
    let id = req.query.id;
    let aTrainer = await trainer.findById(id);
    res.render('adminEditTrainer', { aTrainer: aTrainer, loginName: req.session.email })
}

exports.updateTrainer = async (req, res) => {
    let id = req.body.id;
    let aTrainer = await trainer.findById(id);
    console.log(aTrainer)
    if (req.file) {
        aTrainer.img = req.file.filename;
        console.log(req.file.filename);
    }
    console.log(req.body.name);
    aTrainer.name = req.body.name;
    aTrainer.email = req.body.email;
    aTrainer.speciality = req.body.speciality;
    aTrainer.age = req.body.age;
    aTrainer.address = req.body.address;
    try {
        aTrainer = await aTrainer.save();
        res.redirect('/admin/adminViewTrainer');
    }
    catch (error) {
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
    staff.findByIdAndRemove(id).then(data = {});

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
    trainer.findByIdAndRemove(id).then(data = {});
    console.log(aTrainer.name);
    await courseDetail.deleteMany({ trainer: aTrainer.name });
    res.redirect('/admin/adminViewTrainer');
}

exports.searchStaff = async (req, res) => {
    const searchText = req.body.keyword;
    //console.log(req.body.keyword);
    let listStaff;
    let checkAlphaName = validation.checkAlphabet(searchText);
    let checkEmpty = validation.checkEmpty(searchText);
    const searchCondition = new RegExp(searchText, 'i');

    //console.log(checkEmpty);
    if (!checkEmpty) {
        res.redirect('/admin/adminViewStaff');
    }
    else if (checkAlphaName) {
        listStaff = await staff.find({ name: searchCondition });
    }
    res.render('adminViewStaff', { listStaff: listStaff, loginName: req.session.email });
}

exports.searchTrainer = async (req, res) => {
    const searchText = req.body.keyword;
    //console.log(req.body.keyword);
    let listTrainer;
    let checkAlphaName = validation.checkAlphabet(searchText);
    let checkEmpty = validation.checkEmpty(searchText);
    const searchCondition = new RegExp(searchText, 'i');

    //console.log(checkEmpty);
    if (!checkEmpty) {
        res.redirect('/admin/adminViewTrainer');
    }
    else if (checkAlphaName) {
        listTrainer = await trainer.find({ name: searchCondition });
    }
    res.render('adminViewTrainer', { listTrainer: listTrainer, loginName: req.session.email });
}

exports.setDefaultPass = async(req, res) => {
    let id = req.query.id;
    console.log(id);
    let aStaff = await staff.findById(id);
    let account = await Account.findOne({ 'email': aStaff.email }).exec()
    account.password = "12345678";
    try {
        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(account.password, salt, (err, hash) => {
                if (err) throw err;
                account.password = hash;
                account = account.save();
            })
        })
        // account = await account.save();
        res.redirect('/admin/adminViewStaff');
    }
    catch (error) {
        console.log(error);
        res.redirect('/admin/adminViewStaff');
    }
}

exports.getChangePass = (req, res) => {
    res.render('changePass', { loginName: req.session.email })
}

exports.doChangePass = async (req, res) => {
    let user = await Account.findOne({ email: req.session.email });
    let current = req.body.current;
    let newpw = req.body.new;
    let confirm = req.body.confirm;
    let errors = {};
    let flag = true;
    try {
        await bcrypt.compare(current, user.password)
            .then((doMatch) => {
                if (doMatch) {
                    if (newpw.length < 8) {
                        flag = false;
                        Object.assign(errors, { length: "Password must contain 8 characters or more!" });
                    }
                    else if (newpw != confirm) {
                        flag = false;
                        Object.assign(errors, { check: "New Password and Confirm Password do not match!" });
                    }
                }
                else {
                    flag = false;
                    Object.assign(errors, { current: "Old password is incorrect!" });
                }
            });
        if (!flag) {
            res.render('changePass', { errors: errors, loginName: req.session.email })
        }
        else {
            await bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newpw, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user = user.save();
                    req.session.user = user;
                    res.redirect('/admin')
                })
            })

        }
    } catch (err) {
        console.log(err);
    }
}