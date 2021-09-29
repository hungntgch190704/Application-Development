const course = require('../models/course');

exports.addCourse = async (req, res) =>{
    let newCourse = new course({
        name: req.body.name,
        category: req.body.category,
        description:req.body.description,
    })
    newCourse = await newCourse.save();
    console.log(newCourse);

    res.redirect('/staff/course');
}