const Account = require('../models/user');
const trainee = require('../models/trainee');
const trainer = require('../models/trainer');
const courseDetail = require('../models/courseDetail')
const bcrypt = require('bcryptjs');

exports.handleLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let courses = [];
    try {
        let user = await Account.findOne({ email: username });
        if (user.Role == 'trainer') {
            let aTrainer = await trainer.findOne({ email: username });
            courses = courseDetail.find({ trainer: aTrainer.name });
            console.log(courses);
        } else if (user.Role == 'trainee') {
            let atrainee = await trainee.findOne({ email: username });
            let courseD = await courseDetail.find();
            for (let aCourseD of courseD) {
                for (let c of aCourseD.trainees) {
                    if (c == atrainee.name) {
                        courses.push(aCourseD);
                    }
                }
            }
            console.log(courses);
        }
        await bcrypt.compare(password, user.password).then((doMatch) => {
            if (doMatch) {
                if (user.Role == 'staff') {
                    req.session.user = user;
                    req.session.email = username;
                    req.session.staff = true;
                    res.redirect('/staff');
                }
                else if (user.Role == 'admin') {
                    req.session.user = user;
                    req.session.email = username;
                    req.session.admin = true;
                    res.redirect('/admin');
                }
                else if (user.Role == 'trainer') {
                    req.session.user = user;
                    req.session.email = username;
                    req.session.trainer = true;
                    res.redirect('/trainer');
                }
                else {
                    req.session.user = user;
                    req.session.email = username;
                    req.session.trainee = true;
                    req.session.courses = courses;
                    res.redirect('/trainee');
                }
            } else {
                return res.render('index', { errors: 'Username or password is incorrect' })
            }

        })
            // .catch(err => {
            //     console.log(err)
            // })
    } catch (error) {
        //console.log(error);
        //return res.render('index');
    }
};

exports.handleLogout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}