const Account = require('../models/user');

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
                res.redirect('/trainer');
            }
            else{
                req.session.user = acc;
                req.session.email = username;
                req.session.trainee = true;
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