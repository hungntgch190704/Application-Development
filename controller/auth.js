const Account = require('../models/user');
const bcrypt = require ('bcrypt');

exports.handleLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    Account.findOne({ username: username})
    .then(user =>{
        console.log(user)
        bcrypt.compare(password, user.password)
        .then((doMatch) => { 
            if(doMatch){
                sess = req.session;
                sess.username = user.username
                sess.isLogin = true;
                return res.redirect('/products/home')
            }
            return res.render('index', {errors: 'Username or password is incorrect'})
        })
    })
    .catch(err =>{
        res.render('index', {errors: 'Username or password is incorrect'});
    })
}

