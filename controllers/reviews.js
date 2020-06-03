const Course = require('../models/course');

module.exports = {
    create,
}


function create(req, res) {
    Course.findById(req.params.id, function (err, course) {
        console.log(course)
        course.reviews.push(req.body);
        course.save(function (err) {
            res.redirect(`/courses/${course}`);
        })
    })

}