const Account = require('../models/user');
const trainee = require('../models/trainee');
const trainer = require('../models/trainer');
const courseDetail = require('../models/courseDetail')
const bcrypt = require('bcrypt');
// exports.handleLogin = async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     try{
//         let acc= await Account.findOne({email: username});
//         if(acc.password ==password){
//             if(acc.Role == 'staff'){
//                 req.session.user = acc;
//                 req.session.email = username;
//                 req.session.staff = true;
//                 res.redirect('/staff');
//             }
//             else if(acc.Role == 'admin'){
//                 req.session.user = acc;
//                 req.session.email = username;
//                 req.session.admin = true;
//                 res.redirect('/admin');
//             }
//             else if(acc.Role == 'trainer'){
//                 req.session.user = acc;
//                 req.session.email = username;
//                 req.session.trainer = true;
//                 res.redirect('/trainer');
//             }
//             else{
//                 req.session.user = acc;
//                 req.session.email = username;
//                 req.session.trainee = true;
//                 let atrainee = await trainee.findOne({email: username});
//                 let courses = [];
//                 let courseD = await courseDetail.find();
//                 for(let aCourseD of courseD){
//                     for(let c of aCourseD.trainees){
//                         if(c == atrainee.name){
//                             courses.push(aCourseD);
//                         }
//                     }
//                 }
//                 console.log(courses);
//                 req.session.courses = courses;
//                 res.redirect('/trainee');
//             }
//         }else{
//             res.render('index');
//         }
//     }catch (error) {
//         console.log(error);
//         res.render('index');
//     }
// };


exports.handleLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        Account.findOne({ email: username }).then(user => {
            console.log(user);
            console.log(password)
            console.log(user.password);
            bcrypt.compare(password, user.password).then((doMatch) => {
                console.log("vkl")
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
                        let atrainee = trainee.findOne({ email: username });
                        let courses = [];
                        let courseD = courseDetail.find();
                        for (let aCourseD of courseD) {
                            for (let c of aCourseD.trainees) {
                                if (c == atrainee.name) {
                                    courses.push(aCourseD);
                                }
                            }
                        }
                        console.log(courses);
                        req.session.courses = courses;
                        res.redirect('/trainee');
                    }
                }
                return res.render('index', {errors: 'Username or password is incorrect'})
            })
        })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.log(error);
        res.render('index');
    }
};

exports.handleLogout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}