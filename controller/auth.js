const Account = require('../models/user');
const trainee = require('../models/trainee');
const courseDetail = require('../models/courseDetail')
const trainer = require('../models/trainer');
exports.handleLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        let acc= await Account.findOne({email: username});
        if(acc.password ==password){
            if(acc.Role == 'staff'){
                req.session.user = acc;
                req.session.email = username;
                req.session.staff = true;
                res.redirect('/staff');
            }
            else if(acc.Role == 'admin'){
                req.session.user = acc;
                req.session.email = username;
                req.session.admin = true;
                res.redirect('/admin');
            }
            else if(acc.Role == 'trainer'){
                req.session.user = acc;
                req.session.email = username;
                req.session.trainer = true;
                let aTrainer = await trainer.findOne({email: username});
                let courses = await courseDetail.find({trainer : aTrainer.name});
                console.log(courses);
                req.session.courses = courses;
                res.redirect('/trainer');
            }
            else{
                req.session.user = acc;
                req.session.email = username;
                req.session.trainee = true;
                let atrainee = await trainee.findOne({email: username});
                let courses = [];
                let courseD = await courseDetail.find();
                for(let aCourseD of courseD){
                    for(let c of aCourseD.trainees){
                        if(c == atrainee.name){
                            courses.push(aCourseD);
                        }
                    }
                }
                console.log(courses);
                req.session.courses = courses;
                res.redirect('/trainee');
            }
        }else{
            res.render('index');
        }
    }catch (error) {
        console.log(error);
        res.render('index');
    }
};

exports.handleLogout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}